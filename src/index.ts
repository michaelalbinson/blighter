#!/usr/bin/env node

'use strict';

import RSSManager from "./rss/RSSManager";
import DBManager from "./db/DBManager";
import {config} from 'dotenv';
import InitialDataLoader from "./db/types/InitialDataLoader";
import RSSFeedItem from "./db/RSSFeedItem";

(async () => {
    config();
    await DBManager.setup();
    await InitialDataLoader.loadDefaultData();

    await RSSManager.fetchFeeds();
    const item = await RSSFeedItem.getById(1);
    console.log(item);
})();