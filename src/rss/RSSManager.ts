'use strct';

import fetch from 'node-fetch';
import {XMLParser} from "fast-xml-parser";
import Feed from "../db/types/Feed";
import Logger from "../Logger";
import RSSFeed from "../db/RSSFeed";
import FeedItem from "../db/types/FeedItem";
import RSSFeedItem from "../db/RSSFeedItem";

export default class RSSManager {
    static async discoverFromURL(url: string): Promise<Feed> {
        const channelData = await RSSManager.fetchFeedData(url);

        // check if we have cached metadata first
        const feedCacheData = await RSSFeed.getByUrl(url);
        return {
            url: url,
            name: channelData.title,
            description: channelData.description,
            lastBuildDate: channelData.lastBuildDate,
            updatePeriod: channelData['sy:updatePeriod'],
            data: channelData,
            id: feedCacheData?.id || -1
        } as Feed;
    }

    static async fetchFeedData(url: string): Promise<any> {
        Logger.debug(`Getting rss feed for ${url}`);
        const feedData = await fetch(url, RSSManager.modifiers(url));
        if (!feedData.ok) {
            const message = `Failed to reach feed at ${url}`;
            Logger.error(message);
            throw new Error(message);
        }

        const parser = new XMLParser();
        const responseText = await feedData.text();
        let jObj = parser.parse(responseText);
        const channelData = jObj?.rss?.channel; // test the waters to make sure the response makes sense
        if (!channelData) {
            const message = `Response from URL is malformed: ${url}`;
            Logger.error(message);
            throw new Error(message);
        }

        return channelData;
    }

    static modifiers(url: string): object {
        return url.includes('facebook') ? {} :
            {
                headers: {
                    // some sites seem pretty opinionated about node-fetch's default UA
                    // from testing, Meta's doesn't like me spoofing firefox, but Medium doesn't
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0'
                }
            };
    }

    static async discoverAndInsert(url: string): Promise<Feed> {
        const feed = await RSSManager.discoverFromURL(url);
        if (feed.id === -1) {
            await RSSFeed.insert(feed);
            const feedDb = await RSSFeed.getByUrl(url);
            if (!feedDb)
                throw new Error(`Failed to insert rss feed entry for url ${url}`);

            feed.id = feedDb.id;
        }

        await this.processFeeds([feed]);
        return feed;
    }

    static async fetchFeeds(): Promise<Feed[]> {
        const feeds = await RSSFeed.getAll();
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

            Logger.info(`Processing RSS feed for url ${feed.url}`);
            feed.feedItems = [];
            for (const item of feed.data.item) {
                if (!feed.feedItems)
                    continue;

                feed.feedItems.push({
                    title: item.title,
                    link: item.link,
                    categories: RSSManager.parseCategories(item.category),
                    author: item['dc:creator'],
                    pubDate: item.pubDate,
                    description: item.description || item['content:encoded']?.slice(0, 100),
                    feedID: feed.id,
                    content: item.content || item['content:encoded']
                } as FeedItem);
            }

            const promises = feed.feedItems.map(async (item: FeedItem) => {
                if (!item) {
                    Logger.error(`Item not defined ${item}`);
                    return;
                }

                try {
                    await RSSFeedItem.insert(item);
                } catch (e) {
                    Logger.warn(`Insert of feed item failed: ${item.link}`);
                }
            });

            await Promise.all(promises);
        });

        return feeds;
    }

    static parseCategories(categories: string[]|string): string {
        if (typeof categories === 'object')
            return categories.join(', ');

        return categories;
    }
}