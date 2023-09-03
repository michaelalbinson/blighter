'use strict';

import Feed from "./types/Feed";
import DBManager from "../core/db/DBManager";
import DBObject from "../core/db/DBObject";

export default class RSSFeedDB extends DBObject {
    static tableName(): string {
        return 'rss_feed';
    }

    static async getById(id: number): Promise<Feed> {
        return RSSFeedDB.rows2Objects(await this._getById(id))[0];
    }

    static async getByUrl(url: string): Promise<Feed> {
        return RSSFeedDB.rows2Objects(
            await DBManager.fetch(`SELECT * FROM ${this.tableName()} WHERE url=?`, [url])
        )[0];
    }

    static async setActive(id: number, active: boolean): Promise<void> {
        await DBManager.run(`UPDATE ${this.tableName()} SET active = ? WHERE id = ?`, [active, id]);
    }

    static async getAll(): Promise<Feed[]> {
        return RSSFeedDB.rows2Objects(await this._getAll());
    }

    static async getIdMap(): Promise<Map<number, Feed>> {
        const feeds = await RSSFeedDB.getAll();
        const feedMap = new Map<number, Feed>;
        for (let feed of feeds)
            feedMap.set(feed.id, feed);

        return feedMap;
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
                description TEXT DEFAULT NULL,
                last_build_date TEXT,
                update_period TEXT,
                active BOOLEAN NOT NULL DEFAULT TRUE
            );
        `;
    }

    static rows2Objects(rows: any[]): Feed[] {
        let rs = rows;
        if (!rs || rs.length === 0)
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