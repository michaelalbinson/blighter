'use strict';

import {Express} from "express";
import RSSFeedDB from "../rss/RSSFeedDB";
import RSSManager from "../rss/RSSManager";
import ReadingListItemDB from "../reading_list/ReadingListItemDB";
import feedItemDS from "../rss/FeedItemDS";
import WebUtils from "./WebUtils";

export default function setupFeedRoutes(app: Express) {
    app.get('/feeds', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const feeds = await RSSFeedDB.getAll();
            res.status(200).send(feeds);
        });
    });

    app.get('/rss-feed', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const feeds = await RSSFeedDB.getAll();
            res.status(200).send(feeds);
        });
    });

    app.get('/reading-list-feed', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const items = await ReadingListItemDB.getAll();
            res.status(200).send(items);
        });
    });

    app.get('/feed', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            let items;
            if (req.query.id) // TODO expand to allow single-domain selection
                items = await feedItemDS.singleFeed(Number(req.query.id));
            else if (req.query.saved)
                items = await WebUtils.getDataSourceCollector().getSaved();
            else if (req.query.unread)
                items = await WebUtils.getDataSourceCollector().getUnread();
            else if (req.query.annotated)
                items = await WebUtils.getDataSourceCollector().getAnnotated();
            else
                items = await WebUtils.getDataSourceCollector().getActive();

            res.status(200).send(items);
        });
    });

    app.post('/update-feeds', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            // checkboxes are special https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#additional_attributes
            const feeds = await RSSFeedDB.getAll();
            for (let feed of feeds) {
                if (req.body[`feed_${feed.id}`]) {
                    if (feed.active)
                        continue;

                    await RSSFeedDB.setActive(feed.id, true);
                } else {
                    if (!feed.active)
                        continue;

                    await RSSFeedDB.setActive(feed.id, false);
                }
            }
            res.redirect('/manage');
        });
    });

    app.post('/add-feed', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const newFeed = (req.body as { rss_feed: string }).rss_feed
            await RSSManager.discoverAndInsert(newFeed);
            res.redirect('/');
        });
    });

    let fetchFeedLocked = false;
    app.post('/fetch-feeds', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            if (fetchFeedLocked) {
                res.status(400).send('Refresh already in progress');
                return;
            }

            fetchFeedLocked = true;
            await RSSManager.fetchFeeds();
            res.redirect('/');
            fetchFeedLocked = false;
        });
    });

    app.get('/single-feed', (req, res) => {
        WebUtils.sendPublicFile(res, 'index.html');
    });

    app.get('/saved', (req, res) => {
        WebUtils.sendPublicFile(res, 'index.html');
    });

    app.get('/unread', (req, res) => {
        WebUtils.sendPublicFile(res, 'index.html');
    });

    app.get('/reading-list', async (req, res) => {
        WebUtils.sendPublicFile(res, 'index.html');
    });

    app.get('/annotated', async (req, res) => {
        WebUtils.sendPublicFile(res, 'index.html');
    });
}