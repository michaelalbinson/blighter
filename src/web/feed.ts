'use strict';

import {Express} from "express";
import RSSFeed from "../db/RSSFeed";
import RSSFeedItem from "../db/RSSFeedItem";
import RSSManager from "../rss/RSSManager";
import {join} from "path";
import ReadingListItemDB from "../db/ReadingListItemDB";

export default function setupFeedRoutes(app: Express) {
    app.get('/feeds', async (req, res) => {
        const feeds = await RSSFeed.getAll();
        res.status(200).send(feeds);
    });

    app.get('/feed', async (req, res) => {
        let items;
        if (req.query.id) {
            const feed = await RSSFeed.getById(Number(req.query.id));
            items = await RSSFeedItem.getSingleFeed(Number(req.query.id));
            items.map(it => {
                it.feed = feed;
                return it;
            });
        } else if (req.query.saved) {
            const feedMap = await RSSFeed.getIdMap();
            items = (await RSSFeedItem.getSaved())
                .map(it => {
                    it.feed = feedMap.get(it.feedID) || null
                    return it;
                });
        } else {
            const feedMap = await RSSFeed.getIdMap();
            items = (await RSSFeedItem.getActive())
                .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
                .map(it => {
                    it.feed = feedMap.get(it.feedID) || null
                    return it;
                });
        }

        res.send(items);
    });

    app.post('/update-feeds', async (req, res) => {
        // checkboxes are special https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#additional_attributes
        const feeds = await RSSFeed.getAll();
        for (let feed of feeds) {
            if (req.body[`feed_${feed.id}`]) {
                if (feed.active)
                    continue;

                await RSSFeed.setActive(feed.id, true);
            } else {
                if (!feed.active)
                    continue;

                await RSSFeed.setActive(feed.id, false);
            }
        }
        res.redirect('/manage');
    });

    app.post('/add-feed', async (req, res) => {
        const newFeed = (req.body as {rss_feed: string}).rss_feed
        await RSSManager.discoverAndInsert(newFeed);
        res.redirect('/');
    });

    let fetchFeedLocked = false;
    app.post('/fetch-feeds', async (req, res) => {
        if (fetchFeedLocked) {
            res.status(400).send('Refresh already in progress');
            return;
        }

        fetchFeedLocked = true;
        await RSSManager.fetchFeeds();
        res.redirect('/');
        fetchFeedLocked = false;
    });

    app.get('/single-feed', (req, res) => {
        res.status(200).sendFile(join(process.cwd(), 'public/index.html'));
    });

    app.get('/saved', (req, res) => {
        res.status(200).sendFile(join(process.cwd(), 'public/index.html'));
    });

    app.get('/reading-list', async (req, res) => {
        res.status(200).sendFile(join(process.cwd(), 'public/index.html'));
    });

    app.get('/reading-list-feed', async (req, res) => {
        const items = await ReadingListItemDB.getAll();
        res.status(200).send(items);
    });
}