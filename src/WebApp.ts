'use strict';

import express from 'express';
import helmet from "helmet";
import InitialDataLoader from "./db/InitialDataLoader";
import Logger from "./Logger";
import {join} from 'path';
import bodyParser from "body-parser";
import RSSFeed from "./db/RSSFeed";
import setupRoutes from "./web";

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

        app.get('/load-demo-data', async (req, res) => {
            await InitialDataLoader.loadDefaultData();
            res.redirect('/');
        });

        app.get('/saved-feed', async (req, res) => {
            const feeds = await RSSFeed.getAll();
            res.status(200).send(feeds);
        });

        app.get('/manage', async (req, res) => {
            res.status(200).sendFile(join(process.cwd(), 'public/manage.html'));
        });

        app.get('/settings', async (req, res) => {
            res.status(200).sendFile(join(process.cwd(), 'public/settings.html'));
        });

        setupRoutes(app);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => Logger.log(`Example app is listening on port ${PORT}.`));
    }
}