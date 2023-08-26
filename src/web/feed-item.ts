'use strict';

import {Express} from "express";
import RSSFeedItem from "../db/rss/RSSFeedItem";
import ReadingListItemDB from "../db/reading_list/ReadingListItemDB";
import ReadingListItem from "../db/reading_list/types/ReadingListItem";
import WebUtils from "./WebUtils";
import Logger from "../Logger";
import {join} from "path";

export default function setupFeedItemRoutes(app: Express) {
    app.post('/save-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = (req.body as {itemId: string}).itemId;
            if (!itemId)
                return res.status(400).send();

            const item = await WebUtils.resolveItem(itemId);
            if ('feedID' in item)
                await RSSFeedItem.flipSaved(item.id);
            else
                await ReadingListItemDB.flipSaved(item.id);

            res.status(200).send();
        });
    });

    app.get('/feed-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = Number(req.query['itemID'])
            if (!itemId || isNaN(itemId))
                return res.status(400).send();

            const feedItem = await RSSFeedItem.getById(Number(itemId));
            res.status(200).send(feedItem);
        });
    });

    app.get('/reading-list-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = Number(req.query['itemID'])
            if (!itemId || isNaN(itemId))
                return res.status(400).send();

            const feedItem = await ReadingListItemDB.getById(Number(itemId));
            res.status(200).send(feedItem);
        });
    });

    app.get('/add-feed-item', async (req, res) => {
        res.status(200).sendFile(join(process.cwd(), 'public/add-feed-item.html'));
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
                return res.status(400).send();
            }

            res.status(200).redirect('/reading-list');
        });
    });
}