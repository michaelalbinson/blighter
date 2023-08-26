'use strict';

import Feed from "./Feed";
import DataSourceType from "../../data-sources/types/DataSourceType";

export default interface FeedItem extends DataSourceType {
    author: string | null,
    description: string,
    categories: string | null,
    content: string | null,
    feedID: number,
    feed: Feed | null
}