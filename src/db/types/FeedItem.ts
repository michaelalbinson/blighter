'use strict';

import Feed from "./Feed";

export default interface FeedItem {
    title: string,
    link: string,
    author: string|null,
    pubDate: string,
    description: string,
    categories: string|null,
    id: number,
    content: string|null,
    feedID: number,
    feed: Feed|null,
    saved: boolean,
    read: boolean,
    hasNote: boolean
}