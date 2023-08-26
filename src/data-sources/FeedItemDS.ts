'use strict';

import FeedItem from "../db/rss/types/FeedItem";
import DataSource from "./DataSource";
import RSSFeedItem from "../db/rss/RSSFeedItem";
import RSSFeed from "../db/rss/RSSFeed";

class FeedItemDS implements DataSource<FeedItem> {
    async getActive(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await RSSFeedItem.getActive()
        );
    }

    async getAll(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await RSSFeedItem.getAll()
        );
    }

    async getAnnotated(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await RSSFeedItem.getAnnotated()
        );
    }

    async getSaved(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await RSSFeedItem.getSaved()
        );
    }

    async getUnread(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await RSSFeedItem.getUnread()
        );
    }

    async singleFeed(id: number) {
        const feed = await RSSFeed.getById(id);
        const items = await RSSFeedItem.getSingleFeed(id);
        return items.map(it => {
            it.feed = feed;
            return it;
        }).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    }

    private async _withMappedFeeds(items: FeedItem[]): Promise<FeedItem[]> {
        const feedMap = await RSSFeed.getIdMap();
        return items.map(it => {
            it.feed = feedMap.get(it.feedID) || null
            return it;
        });
    }
}

export default new FeedItemDS();