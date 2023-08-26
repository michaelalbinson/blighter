'use strict';

import {Express} from "express";
import RSSFeedItem from "../db/rss/RSSFeedItem";
import ReadingListItemDB from "../db/reading_list/ReadingListItemDB";
import ReadingListItem from "../db/reading_list/types/ReadingListItem";
import WebUtils from "./WebUtils";
import Logger from "../Logger";

export default function setupFeedItemRoutes(app: Express) {
    app.post('/save-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = (req.body as {itemId: string}).itemId;
            if (!itemId) {
               res.status(400).send();
               return;
            }

            const item = await WebUtils.resolveItem(itemId);
            if ('feed' in item)
                await RSSFeedItem.flipSaved(item.id);
            else
                await ReadingListItemDB.flipSaved(item.id);

            res.status(200).send();
        });
    });

    app.get('/feed-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = Number(req.query['itemID'])
            if (!itemId || isNaN(itemId)) {
                res.status(400).send();
                return;
            }

            const feedItem = await RSSFeedItem.getById(Number(itemId));
            res.status(200).send(feedItem);
        });
    });

    app.get('/reading-list-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = Number(req.query['itemID'])
            if (!itemId || isNaN(itemId)) {
                res.status(400).send();
                return;
            }

            const feedItem = await ReadingListItemDB.getById(Number(itemId));
            res.status(200).send(feedItem);
        });
    });

    app.post('/reading-list-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            let {url, title} = (req.body as { url: string, title?: string })
            const domain = ReadingListItemDB.getDomain(url);

            if (!title)
                title = await ReadingListItemDB.getArticleTitle(url);

            const rlItem = {
                link: url,
                title,
                pubDate: new Date().toISOString(),
                domain
            } as ReadingListItem;

            try {
                await ReadingListItemDB.insert(rlItem);
            } catch (e) {
                Logger.debug(e);
                res.status(400).send();
                return;
            }

            res.status(200).redirect('/reading-list');
        });
    });
}