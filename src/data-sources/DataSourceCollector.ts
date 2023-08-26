'use strict';

import DataSource from "./DataSource";
import DataSourceType from "./types/DataSourceType";

type CollectorFn = (a: DataSource<DataSourceType>) => Promise<DataSourceType[]>;

export default class DataSourceCollector {
    private sources: DataSource<DataSourceType>[] = [];

    register(source: DataSource<DataSourceType>) {
        this.sources.push(source);
    }

    async getAll(): Promise<DataSourceType[]> {
        return await DataSourceCollector._collect(this.sources, source => source.getAll());
    }

    async getActive() {
        return await DataSourceCollector._collect(this.sources, source => source.getActive());
    }

    async getUnread() {
        return await DataSourceCollector._collect(this.sources, source => source.getUnread());
    }

    async getSaved() {
        return await DataSourceCollector._collect(this.sources, source => source.getSaved());
    }

    async getAnnotated() {
        return await DataSourceCollector._collect(this.sources, source => source.getAnnotated());
    }

    static async _collect(sources: DataSource<DataSourceType>[], lambda: CollectorFn): Promise<DataSourceType[]> {
        let dst = [] as DataSourceType[];
        for (let source of sources)
            dst = dst.concat(await lambda(source));

        return dst.sort(
            (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
    }
}