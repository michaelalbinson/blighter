'use strict';

import {Express} from "express";
import setupFeedItemRoutes from './feed-item';
import setupFeedRoutes from './feed';
import setupNoteRoutes from "./note";
import setupLLMRoutes from "./llm";
import setupActivityRoutes from "./activity-item";

export default function setupRoutes(app: Express) {
    setupActivityRoutes(app);
    setupFeedRoutes(app);
    setupFeedItemRoutes(app);
    setupNoteRoutes(app);
    setupLLMRoutes(app);
}