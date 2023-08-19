'use strict';

import {Express} from "express";
import RSSFeedItem from "../db/RSSFeedItem";
import ReadingListItemDB from "../db/ReadingListItemDB";
import ReadingListItem from "../db/types/ReadingListItem";

export default function setupFeedItemRoutes(app: Express) {
    app.post('/save-item', async (req, res) => {
        try {
            const itemId = (req.body as {itemId: number}).itemId;
            if (!itemId)
                return res.status(400).send();

            await RSSFeedItem.flipSaved(itemId);
            res.status(200).send();
        } catch (e) {
            res.status(500).send();
        }
    });

    app.get('/feed-item', async (req, res) => {
        try {
            const itemId = Number(req.query['itemID'])
            if (!itemId || isNaN(itemId))
                return res.status(400).send();

            const feedItem = await RSSFeedItem.getById(Number(itemId));
            res.status(200).send(feedItem);
        } catch (e) {
            res.status(500).send();
        }
    });

    app.post('/reading-list-item', async (req, res) => {
        const {url} = (req.body as {url: string})
        const domain = ReadingListItemDB.getDomain(url);
        const title = await ReadingListItemDB.getArticleTitle(url);
        const rlItem = {
            link: url,
            title,
            addedOn: new Date().toISOString(),
            domain
        } as ReadingListItem;

        try {
            await ReadingListItemDB.insert(rlItem);
        } catch (e) {
            return res.status(400).send();
        }

        res.status(200).redirect('/reading-list');
    });
}