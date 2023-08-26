'use strict';

import FeedItem from "./types/FeedItem";
import DataSource from "../data-sources/DataSource";
import FeedItemDB from "./FeedItemDB";
import RSSFeedDB from "./RSSFeedDB";

class FeedItemDS implements DataSource<FeedItem> {
    async getActive(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await FeedItemDB.getActive()
        );
    }

    async getAll(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await FeedItemDB.getAll()
        );
    }

    async getAnnotated(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await FeedItemDB.getAnnotated()
        );
    }

    async getSaved(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await FeedItemDB.getSaved()
        );
    }

    async getUnread(): Promise<FeedItem[]> {
        return await this._withMappedFeeds(
            await FeedItemDB.getUnread()
        );
    }

    async singleFeed(id: number) {
        const feed = await RSSFeedDB.getById(id);
        const items = await FeedItemDB.getSingleFeed(id);
        return items.map(it => {
            it.feed = feed;
            return it;
        }).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    }

    private async _withMappedFeeds(items: FeedItem[]): Promise<FeedItem[]> {
        const feedMap = await RSSFeedDB.getIdMap();
        return items.map(it => {
            it.feed = feedMap.get(it.feedID) || null
            return it;
        });
    }
}

export default new FeedItemDS();