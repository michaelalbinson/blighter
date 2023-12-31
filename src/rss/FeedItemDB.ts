'use strict';

import FeedItem from "./types/FeedItem";
import DBManager from "../core/db/DBManager";
import DBObject from "../core/db/DBObject";

export default class FeedItemDB extends DBObject {
    static tableName(): string {
        return 'feed_item';
    }

    static async getById(id: number): Promise<FeedItem> {
        return FeedItemDB.rows2Objects([await this._getById(id)])[0];
    }

    static async getAll(): Promise<FeedItem[]> {
        return FeedItemDB.rows2Objects(await this._getAll());
    }

    static async getByUrl(link: string): Promise<FeedItem> {
        return this.rows2Objects(
            await DBManager.fetch(`SELECT * FROM ${this.tableName()} WHERE link=?`, [link])
        )[0];
    }

    static async getUnread(): Promise<FeedItem[]> {
        return FeedItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM feed_item WHERE read = false;`)
        );
    }

    static async flipSaved(id: number, saved: boolean): Promise<void> {
        await DBManager.run(`UPDATE feed_item SET saved = ? WHERE id = ?;`, [saved, id]);
    }

    static async flipRead(id: number, read: boolean): Promise<void> {
        await DBManager.run(`UPDATE feed_item SET read = ? WHERE id = ?;`, [read, id]);
    }

    static async setHasNote(id: number): Promise<void> {
        await DBManager.run(`UPDATE feed_item SET has_note = true WHERE id = ?;`, [id]);
    }

    static async getActive(): Promise<FeedItem[]> {
        return FeedItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM feed_item WHERE feed_id IN (
                SELECT id FROM rss_feed WHERE active = 1
            );`)
        );
    }

    static async getSingleFeed(id: number): Promise<FeedItem[]> {
        return FeedItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM feed_item WHERE feed_id = ?;`, [id])
        );
    }

    static async getSaved(): Promise<FeedItem[]> {
        return FeedItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM feed_item WHERE saved = true;`)
        );
    }

    static async getAnnotated(): Promise<FeedItem[]> {
        return FeedItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM feed_item WHERE has_note = true;`)
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
                categories TEXT,
                saved BOOLEAN NOT NULL DEFAULT FALSE,
                read BOOLEAN NOT NULL DEFAULT FALSE,
                has_note BOOLEAN NOT NULL DEFAULT FALSE
            );
        `;
    }

    static rows2Objects(rows: any[]): FeedItem[] {
        let rs = rows;
        if (!rs || rs.length === 0)
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
                content: result.content,
                saved: result.saved,
                read: result.read,
                hasNote: result.has_note
            } as FeedItem;
        });
    }
}