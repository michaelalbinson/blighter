#!/usr/bin/env node

'use strict';

import DBManager from "./db/DBManager";
import {config} from 'dotenv';
import WebApp from "./WebApp";

(async () => {
    config();
    await DBManager.setup();
    WebApp.start();
})();