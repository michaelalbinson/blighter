'use strict';

import {Express} from "express";
import RSSFeedItem from "../db/RSSFeedItem";

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
}