'use strict';

import FeedItem from "./types/FeedItem";
import DBManager from "./DBManager";
import DBObject from "./DBObject";

export default class RSSFeedItem extends DBObject {
    static tableName(): string {
        return 'feed_item';
    }

    static async getById(id: number): Promise<FeedItem> {
        return RSSFeedItem.rows2Objects([await this._getById(id)])[0];
    }

    static async getAll(): Promise<FeedItem[]> {
        return RSSFeedItem.rows2Objects(await this._getAll());
    }

    static async getActive(): Promise<FeedItem[]> {
        return RSSFeedItem.rows2Objects(
            await DBManager.query(`SELECT * FROM feed_item WHERE feed_id IN (
                SELECT id FROM rss_feed WHERE active = 1
            );`, [])
        );
    }

    static async getSingleFeed(id: number): Promise<FeedItem[]> {
        return RSSFeedItem.rows2Objects(
            await DBManager.query(`SELECT * FROM feed_item WHERE feed_id = ?;`, [id])
        );
    }

    static async insert(item: FeedItem) {
        const sql = `
            INSERT INTO feed_item (
                title,
                link,
                author,
                pub_date,
                description,
                categories,
                feed_id,
                content
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const params = [
            item.title,
            item.link,
            item.author,
            item.pubDate,
            item.description,
            item.categories,
            item.feedID,
            item.content
        ];

        await DBManager.run(sql, params);
    }

    static tableSQL(): string {
        return `
            CREATE TABLE IF NOT EXISTS ${this.tableName()} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                feed_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                link TEXT NOT NULL UNIQUE,
                author TEXT,
                content TEXT,
                pub_date TEXT NOT NULL,
                description TEXT NOT NULL,
                categories TEXT
            );
        `;
    }

    static rows2Objects(rows: any[]): FeedItem[] {
        let rs = rows;
        if (!rs)
            return [];

        if (!rs.length)
            rs = [rows];

        return rs.map(result => {
            return {
                title: result.title,
                link: result.link,
                author: result.author,
                pubDate: result.pub_date,
                description: result.description,
                categories: result.categories,
                id: result.id,
                feedID: result.feed_id,
                content: result.content
            } as FeedItem;
        });
    }
}