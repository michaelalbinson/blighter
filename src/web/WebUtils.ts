'use strict';

import FeedItem from "../rss/types/FeedItem";
import ReadingListItem from "../reading_list/types/ReadingListItem";
import FeedItemDB from "../rss/FeedItemDB";
import ReadingListItemDB from "../reading_list/ReadingListItemDB";
import Logger from "../Logger";
import {Response, Request} from "express";
import DataSourceCollector from "../data-sources/DataSourceCollector";
import FeedItemDS from "../rss/FeedItemDS";
import ReadingListItemDS from "../reading_list/ReadingListItemDS";

export default class WebUtils {
    static dataSourceCollector: DataSourceCollector;

    static async resolveItem(itemId: string): Promise<FeedItem | ReadingListItem> {
        let item: FeedItem|ReadingListItem;
        if (itemId.includes('feed_item')) {
            const feedItemId = Number(itemId.split('feed_item-')[1])
            item = await FeedItemDB.getById(feedItemId);
        } else if (itemId.includes('reading_list_item')) {
            const feedItemId = Number(itemId.split('reading_list_item-')[1])
            item = await ReadingListItemDB.getById(feedItemId);
        } else
            throw new Error('yikes');

        return item;
    };

    static async defaultReqHandling(req: Request, res: Response, action: () => Promise<void|any>) {
        Logger.debug(`Request received to: ${req.url}`);
        try {
            await action();
        } catch (e) {
            Logger.debug(e);
            res.status(500).send();
        }
    }

    static getDataSourceCollector(): DataSourceCollector {
        if (this.dataSourceCollector)
            return this.dataSourceCollector;

        this.dataSourceCollector = new DataSourceCollector();
        this.dataSourceCollector.register(FeedItemDS);
        this.dataSourceCollector.register(ReadingListItemDS);
        return this.dataSourceCollector;
    }
}