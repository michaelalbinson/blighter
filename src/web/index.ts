'use strict';

import {Express} from "express";
import setupFeedItemRoutes from './feed-item';
import setupFeedRoutes from './feed';
import setupNoteRoutes from "./note";

export default function setupRoutes(app: Express) {
    setupFeedRoutes(app);
    setupFeedItemRoutes(app);
    setupNoteRoutes(app);
}