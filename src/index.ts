#!/usr/bin/env node

'use strict';

// this must be the first thing we do to make sure we've loaded the .env config before teh database loads
import {config} from 'dotenv';
config();

import DBManager from "./core/db/DBManager";
import WebApp from "./WebApp";
import API from "./llm/API";

(async () => {
    await DBManager.setup();
    WebApp.start();
})();

process.on('SIGINT', async () => {
    await API.testSeam_killAll();
    process.exit(0);
});