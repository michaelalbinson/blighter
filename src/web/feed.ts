'use strict';

import {Express} from "express";
import RSSFeed from "../db/rss/RSSFeed";
import RSSManager from "../db/rss/RSSManager";
import {join} from "path";
import ReadingListItemDB from "../db/reading_list/ReadingListItemDB";
import DataSourceCollector from "../data-sources/DataSourceCollector";
import feedItemDS from "../data-sources/FeedItemDS";

export default function setupFeedRoutes(app: Express) {
    app.get('/feeds', async (req, res) => {
        const feeds = await RSSFeed.getAll();
        res.status(200).send(feeds);
    });

    app.get('/feed', async (req, res) => {
        let items;
        if (req.query.id) // TODO expand to allow single-domain selection
            items = await feedItemDS.singleFeed(Number(req.query.id));
        else if (req.query.saved)
            items = await DataSourceCollector.getSaved();
        else if (req.query.annotated)
            items = await DataSourceCollector.getAnnotated();
        else
            items = await DataSourceCollector.getActive();

        res.status(200).send(items);
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

    app.get('/rss-feed', async (req, res) => {
        const feeds = await RSSFeed.getAll();
        res.status(200).send(feeds);
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

    app.get('/annotated', async (req, res) => {
        res.status(200).sendFile(join(process.cwd(), 'public/index.html'));
    });

    app.get('/reading-list-feed', async (req, res) => {
        const items = await ReadingListItemDB.getAll();
        res.status(200).send(items);
    });
}