'use strct';

import {XMLParser} from "fast-xml-parser";
import Feed from "./types/Feed";
import Logger from "../Logger";
import RSSFeedDB from "./RSSFeedDB";
import FeedItem from "./types/FeedItem";
import FeedItemDB from "./FeedItemDB";
import FileMan from "../core/fs/util/FileMan";

export default class RSSManager {
    static async discoverFromURL(url: string): Promise<Feed> {
        const channelData = await RSSManager.fetchFeedData(url);

        // check if we have cached metadata first
        const feedCacheData = await RSSFeedDB.getByUrl(url);
        if (channelData.item) {
            return {
                url: url,
                name: channelData.title,
                description: channelData.description,
                lastBuildDate: channelData.lastBuildDate,
                updatePeriod: channelData['sy:updatePeriod'],
                data: channelData,
                id: feedCacheData?.id || -1,
                active: true,
                feedItems: []
            } as Feed;
        } else {
            return {
                url: url,
                name: channelData.title,
                lastBuildDate: channelData.updated,
                data: channelData,
                id: feedCacheData?.id || -1,
                active: true,
                feedItems: []
            } as Feed;
        }
    }

    static async fetchFeedData(url: string): Promise<any> {
        Logger.debug(`Getting rss feed for ${url}`);
        const feedData = await fetch(url, RSSManager.modifiers(url));
        if (!feedData.ok) {
            const message = `Failed to reach feed at ${url}`;
            Logger.error(message);
            throw new Error(message);
        }

        const responseText = await feedData.text();
        return this.processFeedToXML(responseText, url);
    }

    static processFeedToXML(feedData: string, url: string) {
        const parser = new XMLParser();
        let jObj = parser.parse(feedData);
        if (!(this.isRSSFeed(jObj) || this.isAtomFeed(jObj))) {
            const message = `Data from URL is malformed: ${url}`;
            Logger.error(message);
            throw new Error(message);
        }

        return this.isRSSFeed(jObj) ?
            jObj?.rss?.channel : // RSS feed
            jObj?.feed; // Atom feed
    }

    static isAtomFeed(feedData: any) {
        return feedData?.feed;
    }

    static isRSSFeed(feedData: any) {
        return feedData?.rss?.channel;
    }

    static modifiers(url: string): object {
        return url.includes('facebook') ? {} :
            {
                headers: {
                    // some sites seem pretty opinionated about fetch's default UA
                    // from testing, Meta's doesn't like me spoofing firefox, but Medium doesn't
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0'
                }
            };
    }

    static async discoverAndInsert(url: string): Promise<Feed> {
        const feed = await RSSManager.discoverFromURL(url);
        if (feed.id === -1) {
            await RSSFeedDB.insert(feed);
            const feedDb = await RSSFeedDB.getByUrl(url);
            if (!feedDb)
                throw new Error(`Failed to insert rss feed entry for url ${url}`);

            feed.id = feedDb.id;
        }

        await this.processFeeds([feed]);
        return feed;
    }

    static async updateSingleFeed(feedId: number) {
        const feed = await RSSFeedDB.getById(feedId);
        return await this.updateFeeds([feed]);
    }

    static async fetchFeeds(): Promise<Feed[]> {
        const feeds = await RSSFeedDB.getAll();
        return await this.updateFeeds(feeds);
    }

    private static async updateFeeds(feeds: Feed[]): Promise<Feed[]> {
        for (const feed of feeds) {
            try {
                feed.data = await RSSManager.fetchFeedData(feed.url);
            } catch (e) {
                Logger.warn(`Failed to update feed: ${e}`);
            }
        }

        return await this.processFeeds(feeds);
    }

    static async processFeeds(feeds: Feed[]): Promise<Feed[]> {
        feeds.map(async (feed) => {
            if (!feed.data)
                return feed;

            feed.feedItems = [];
            if (feed.data.item) {
                Logger.info(`Processing RSS feed for url ${feed.url}`);
                for (const item of feed.data.item) {
                    if (!feed.feedItems)
                        continue;

                    feed.feedItems.push(this.getRSSFeedItem(item, feed));
                }
            } else {
                Logger.info(`Processing Atom feed for url ${feed.url}`);
                try {
                    for (const item of feed.data.entry) {
                        if (!feed.feedItems)
                            continue;

                        feed.feedItems.push(this.getAtomFeedItem(item, feed));
                    }
                } catch (e) {
                    Logger.error(e);
                    Logger.info(`Failed to iterate over entry collection ${feed.data.entry}`);
                }
            }

            const promises = feed.feedItems.map(async (item: FeedItem) => {
                if (!item) {
                    Logger.error(`Item not defined ${item}`);
                    return;
                }

                try {
                    await FeedItemDB.insert(item);
                } catch (e) {
                    Logger.warn(`Insert of feed item failed: ${item.link}`);
                }
            });

            await Promise.all(promises);
        });

        return feeds;
    }

    static getRSSFeedItem(item: any, feed: Feed): FeedItem {
        return {
            title: item.title,
            link: item.link,
            categories: RSSManager.parseCategories(item.category),
            author: item['dc:creator'],
            pubDate: item.pubDate,
            description: item.description || item['content:encoded']?.slice(0, 100),
            feedID: feed.id,
            content: item.content || item['content:encoded']
        } as FeedItem
    }

    static getAtomFeedItem(item: any, feed: Feed): FeedItem {
        return {
            title: item.title,
            link: item.id,
            categories: null,
            author: item.author.name,
            pubDate: item.published,
            description: item.summary || '',
            feedID: feed.id,
            content: null
        } as FeedItem
    }

    static parseCategories(categories: string[]|string): string {
        if (typeof categories === 'object')
            return categories.join(', ');

        return categories;
    }

    /**
     * For when providers block you from downloading their feeds directly (looking at you Meta)
     * @param filePath {string}
     */
    static async manualIngest(filePath: string) {
        const fileData = await FileMan.read(filePath);
        const feedData = this.processFeedToXML(fileData, filePath);
        const feeds = await RSSFeedDB.getAll();
        let matchingFeed;
        for (let feed of feeds) {
            if (!feed.url.includes(feedData.link))
                continue;

            matchingFeed = feed;
            break;
        }

        if (!matchingFeed)
            throw new Error('Failed to find a matching feed for the manual ingest');

        matchingFeed.data = feedData;
        await this.processFeeds([matchingFeed]);
    }
}