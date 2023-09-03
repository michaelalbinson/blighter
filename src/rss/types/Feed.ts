'use strict';

import FeedItem from "./FeedItem";

export default interface Feed {
    url: string,
    name: string,
    description?: string,
    lastBuildDate?: string,
    updatePeriod?: string,
    id: number,
    active: boolean,
    data?: any,
    feedItems?: FeedItem[],
}