'use strict';

import FeedItem from "../db/rss/types/FeedItem";
import ReadingListItem from "../db/reading_list/types/ReadingListItem";
import RSSFeedItem from "../db/rss/RSSFeedItem";
import ReadingListItemDB from "../db/reading_list/ReadingListItemDB";

export default class WebUtils {
    static async resolveItem(itemId: string): Promise<FeedItem | ReadingListItem> {
        let item: FeedItem|ReadingListItem;
        if (itemId.includes('feed_item')) {
            const feedItemId = Number(itemId.split('feed_item-')[1])
            item = await RSSFeedItem.getById(feedItemId);
        } else if (itemId.includes('reading_list_item')) {
            const feedItemId = Number(itemId.split('reading_list_item-')[1])
            item = await ReadingListItemDB.getById(feedItemId);
        } else
            throw new Error('yikes');

        return item;
    };
}