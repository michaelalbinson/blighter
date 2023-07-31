'use strict';

export default interface FeedItem {
    title: string,
    link: string,
    author: string|null,
    pubDate: string,
    description: string,
    categories: string|null,
    id: number,
    feedID: number
}