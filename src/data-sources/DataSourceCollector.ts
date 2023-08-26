'use strict';

import DataSource from "./DataSource";
import DataSourceType from "./types/DataSourceType";
import FeedItemDS from "./FeedItemDS";
import ReadingListItemDS from "./ReadingListItemDS";

type CollectorFn = (a: DataSource<DataSourceType>) => Promise<DataSourceType[]>;

export default class DataSourceCollector {
    static async getAll(): Promise<DataSourceType[]> {
        return await this._collect(source => source.getAll());
    }

    static async getActive() {
        return await this._collect(source => source.getActive());
    }

    static async getUnread() {
        return await this._collect(source => source.getUnread());
    }

    static async getSaved() {
        return await this._collect(source => source.getSaved());
    }

    static async getAnnotated() {
        return await this._collect(source => source.getAnnotated());
    }

    static async _collect(lambda: CollectorFn): Promise<DataSourceType[]> {
        const sources = this._dataSources();
        let dst = [] as DataSourceType[];
        for (let source of sources)
            dst = dst.concat(await lambda(source));

        return dst.sort(
            (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
    }

    static _dataSources(): DataSource<DataSourceType>[] {
        return [
            FeedItemDS,
            ReadingListItemDS
        ]
    }
}