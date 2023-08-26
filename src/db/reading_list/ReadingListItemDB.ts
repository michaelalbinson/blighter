'use strict';

import ReadingListItem from "./types/ReadingListItem";
import DBObject from "../DBObject";
import DBManager from "../DBManager";
import * as cheerio from 'cheerio';

export default class ReadingListItemDB extends DBObject {
    static tableName() {
        return 'reading_list_item';
    }

    static async getById(id: number): Promise<ReadingListItem> {
        return this.rows2Objects([await this._getById(id)])[0];
    }

    static async getSaved(): Promise<ReadingListItem[]> {
        return this.rows2Objects(
            await DBManager.query(`SELECT * FROM ${this.tableName()} WHERE saved = true;`)
        );
    }

    static async getUnread(): Promise<ReadingListItem[]> {
        return this.rows2Objects(
            await DBManager.query(`SELECT * FROM ${this.tableName()} WHERE read = false;`)
        );
    }

    static async getAnnotated(): Promise<ReadingListItem[]> {
        return this.rows2Objects(
            await DBManager.query(`SELECT * FROM ${this.tableName()} WHERE has_note = true;`)
        );
    }

    static async getByUrl(link: string): Promise<ReadingListItem> {
        return this.rows2Objects(
            await DBManager.fetch(`SELECT * FROM ${this.tableName()} WHERE link=?`, [link])
        )[0];
    }

    static async setHasNote(id: number): Promise<void> {
        await DBManager.run(`UPDATE ${this.tableName()} SET has_note = true WHERE id = ?;`, [id]);
    }

    static async flipSaved(id: number, saved: boolean): Promise<void> {
        await DBManager.run(`UPDATE ${this.tableName()} SET saved = ? WHERE id = ?;`, [saved, id])
    }

    static async flipRead(id: number, read: boolean): Promise<void> {
        await DBManager.run(`UPDATE ${this.tableName()} SET read = ? WHERE id = ?;`, [read, id])
    }

    static async getAll(): Promise<ReadingListItem[]> {
        return this.rows2Objects(await this._getAll());
    }

    static async insert(item: ReadingListItem) {
        const sql = `
            INSERT INTO ${this.tableName()} (
                title,
                link,
                added_on,
                domain
            ) VALUES (?, ?, ?, ?);
        `;

        const params = [
            item.title,
            item.link,
            item.pubDate,
            item.domain
        ];

        await DBManager.run(sql, params);
    }

    static async getArticleTitle(url: string): Promise<string> {
        let res = await fetch(url, {headers: {'User-agent': 'googlebot'}});
        if (!res.ok) {
            // sometimes the googlebot UA isn't appreciated
            res = await fetch(url);
            if (!res.ok) {
                // if we still failed to get the data, throw
                throw new Error('Failed to GET webpage');
            }
        }

        const text = await res.text();
        const title = text.match(/<title[ a-zA-Z="-]*>[^<.]+<\/title>/gi);
        if (title) {
            return title[0]
                .replace(/<title[ a-zA-Z="-]*>/i, '')
                .replace('</title>', '')
                .trim();
        } else {
            // only load the full dom if we really need to
            const dom = cheerio.load(text);
            return dom('title').text().trim();
        }
    }

    static getDomain(url: string): string {
        const match = url.match(/https:\/\/[\w.]*[^\/]/gi);
        if (!match)
            throw new Error('no domain found');

        return match[0].replace('https://', '');
    }

    static rows2Objects(rows: any[]): ReadingListItem[] {
        let rs = rows;
        if (!rs || rs.length === 0)
            return [];

        if (!rs.length)
            rs = [rows];

        return rs.map(result => {
            return {
                id: result.id,
                title: result.title,
                link: result.link,
                read: result.read,
                saved: result.saved,
                pubDate: result.added_on, // this a quirk of compatability with DataSourceType.ts and having one sortable field
                domain: result.domain,
                hasNote: result.has_note
            } as ReadingListItem;
        });
    }

    static tableSQL(): string {
        return `
            CREATE TABLE IF NOT EXISTS ${ReadingListItemDB.tableName()} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                link TEXT NOT NULL UNIQUE,
                read BOOLEAN NOT NULL DEFAULT FALSE,
                saved BOOLEAN NOT NULL DEFAULT FALSE,
                added_on TEXT NOT NULL,
                domain TEXT NOT NULL,
                has_note BOOLEAN NOT NULL DEFAULT FALSE
            );
        `;
    }
}