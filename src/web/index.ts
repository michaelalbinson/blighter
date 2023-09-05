'use strict';

import {Express} from "express";
import setupFeedItemRoutes from './feed-item';
import setupFeedRoutes from './feed';
import setupNoteRoutes from "./note";
import setupLLMRoutes from "./llm";

export default function setupRoutes(app: Express) {
    setupFeedRoutes(app);
    setupFeedItemRoutes(app);
    setupNoteRoutes(app);
    setupLLMRoutes(app);
}