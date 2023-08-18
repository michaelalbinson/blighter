#!/usr/bin/env node

'use strict';

// this must be the first thing we do to make sure we've loaded the .env config before teh database loads
import {config} from 'dotenv';
config();

import DBManager from "./db/DBManager";
import WebApp from "./WebApp";

(async () => {
    await DBManager.setup();
    WebApp.start();
})();