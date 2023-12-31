'use strict';

import {Express} from "express";
import FeedItemDB from "../rss/FeedItemDB";
import ReadingListItemDB from "../reading_list/ReadingListItemDB";
import ReadingListItem from "../reading_list/types/ReadingListItem";
import WebUtils from "./WebUtils";
import Logger from "../Logger";
import {join} from "path";

export default function setupFeedItemRoutes(app: Express) {
    app.post('/item/save', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const {itemId, saved} = (req.body as {itemId: string, saved: boolean});
            if (!itemId)
                return res.status(400).send();

            const item = await WebUtils.resolveItem(itemId);
            if ('feedID' in item)
                await FeedItemDB.flipSaved(item.id, Boolean(saved));
            else
                await ReadingListItemDB.flipSaved(item.id, Boolean(saved));

            res.status(200).send();
        });
    });

    app.post('/item/mark-read', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const {itemId, read} = (req.body as {itemId: string, read: boolean});
            if (!itemId)
                return res.status(400).send();

            const item = await WebUtils.resolveItem(itemId);
            if ('feedID' in item)
                await FeedItemDB.flipRead(item.id, Boolean(read));
            else
                await ReadingListItemDB.flipRead(item.id, Boolean(read));

            res.status(200).send();
        });
    });

    app.get('/item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = Number(req.query['itemID'])
            if (!itemId || isNaN(itemId))
                return res.status(400).send();

            const feedItem = await FeedItemDB.getById(Number(itemId));
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
        WebUtils.sendPublicFile(res, 'add-feed-item.html');
    });

    app.post('/item', async (req, res) => {
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

            res.status(200).redirect('back');
        });
    });
}