'use strict';

import Feed from "./types/Feed";
import DBManager from "./DBManager";
import DBObject from "./DBObject";

export default class RSSFeed extends DBObject {
    static tableName(): string {
        return 'rss_feed';
    }

    static async getById(id: number): Promise<Feed> {
        return RSSFeed.rows2Objects(await this._getById(id))[0];
    }

    static async getByUrl(url: string): Promise<Feed> {
        return RSSFeed.rows2Objects(
            await DBManager.fetch(`SELECT * FROM ${this.tableName()} WHERE url=?`, [url])
        )[0];
    }

    static async getAll(): Promise<Feed[]> {
        return RSSFeed.rows2Objects(await this._getAll());
    }

    static async insert(feed: Feed) {
        const sql = `
            INSERT INTO rss_feed (
                url,
                name,
                description,
                last_build_date,
                update_period
            ) VALUES (?, ?, ?, ?, ?)
        `;

        const params = [
            feed.url,
            feed.name,
            feed.description,
            feed.lastBuildDate,
            feed.updatePeriod
        ];

        await DBManager.run(sql, params);
    }

    static tableSQL(): string {
        return `
            CREATE TABLE IF NOT EXISTS ${this.tableName()} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                last_build_date TEXT,
                update_period TEXT,
                active BOOLEAN NOT NULL DEFAULT TRUE
            );
        `;
    }

    static rows2Objects(rows: any[]): Feed[] {
        let rs = rows;
        if (!rs)
            return [];

        if (!rs.length)
            rs = [rows];

        return rs.map(result => {
            return {
                url: result.url,
                name: result.name,
                description: result.description,
                lastBuildDate: result.last_build_date,
                updatePeriod: result.update_period,
                active: result.active,
                id: result.id
            } as Feed;
        });
    }
}