'use strict';

import DataSourceType from "./types/DataSourceType";

export default interface DataSource<T extends DataSourceType> {
    getActive(): Promise<T[]>;
    getAll(): Promise<T[]>;
    getUnread(): Promise<T[]>;
    getSaved(): Promise<T[]>;
    getAnnotated(): Promise<T[]>;
}