'use strict';

import RSSFeedItem from "./RSSFeedItem";
import ReadingListItemDB from "./ReadingListItemDB";
import FeedItem from "./types/FeedItem";
import ReadingListItem from "./types/ReadingListItem";
import RSSFeed from "./RSSFeed";

export default class FeedCollector {
    static async getAll() {
        const rss = await RSSFeedItem.getAll();
        const reading = await ReadingListItemDB.getAll();
        const arr = new Array<ReadingListItem|FeedItem>();
        return arr
            .concat(rss)
            .concat(reading)
            .sort((a: FeedItem|ReadingListItem, b: FeedItem|ReadingListItem) => {
                return this.resolveDate(b) - this.resolveDate(a);
            });
    }

    static async getActive() {
        const feedMap = await RSSFeed.getIdMap();
        const rss = (await RSSFeedItem.getActive()).map(it => {
            it.feed = feedMap.get(it.feedID) || null
            return it;
        });
        const reading = await ReadingListItemDB.getAll();
        const arr = new Array<ReadingListItem|FeedItem>();
        return arr
            .concat(rss)
            .concat(reading)
            .sort((a: FeedItem|ReadingListItem, b: FeedItem|ReadingListItem) => {
                return this.resolveDate(b) - this.resolveDate(a);
            });
    }

    static async getSaved() {

    }

    static resolveDate(item: FeedItem|ReadingListItem): number {
        if ("pubDate" in item)
            return new Date(item.pubDate).getTime();
        else if ("addedOn" in item)
            return new Date(item.addedOn).getTime();
        else
            return new Date(-1).getTime();
    }
}