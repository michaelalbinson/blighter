'use strict';

import express from 'express';
import helmet from "helmet";
import RSSManager from "./rss/RSSManager";
import InitialDataLoader from "./db/types/InitialDataLoader";
import Logger from "./Logger";
import RSSFeedItem from "./db/RSSFeedItem";
import {join} from 'path';
import bodyParser from "body-parser";
import RSSFeed from "./db/RSSFeed";

export default class WebApp {
    static start() {
        const app = express();

        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(express.static(join(process.cwd(), 'public')))

        app.get('/', (req, res) => {
            res.status(200).sendFile(join(process.cwd(), 'public/index.html'));
        });

        app.get('/single-feed', (req, res) => {
            res.status(200).sendFile(join(process.cwd(), 'public/index.html'));
        });

        app.get('/saved', (req, res) => {
            res.status(200).sendFile(join(process.cwd(), 'public/index.html'));
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

        app.post('/add-feed', async (req, res) => {
            const newFeed = (req.body as {rss_feed: string}).rss_feed
            await RSSManager.discoverAndInsert(newFeed);
            res.redirect('/');
        });

        app.post('/save-item', async (req, res) => {
            try {
                console.log(req.body);
                const itemId = (req.body as {itemId: number}).itemId;
                if (!itemId)
                    return res.status(400).send();

                await RSSFeedItem.flipSaved(itemId);
                res.status(200).send();
            } catch (e) {
                res.status(500).send();
            }
        });

        app.get('/load-demo-data', async (req, res) => {
            await InitialDataLoader.loadDefaultData();
            res.redirect('/');
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

        app.get('/feeds', async (req, res) => {
            const feeds = await RSSFeed.getAll();
            res.status(200).send(feeds);
        });

        app.get('/saved-feed', async (req, res) => {
            const feeds = await RSSFeed.getAll();
            res.status(200).send(feeds);
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

        app.get('/manage', async (req, res) => {
            res.status(200).sendFile(join(process.cwd(), 'public/manage.html'));
        });

        app.get('/settings', async (req, res) => {
            res.status(200).sendFile(join(process.cwd(), 'public/settings.html'));
        });

        app.listen(process.env.PORT || 3000, () => Logger.log('Example app is listening on port 3000.'));
    }
}