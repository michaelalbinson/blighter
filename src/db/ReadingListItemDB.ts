'use strict';

import ReadingListItem from "./types/ReadingListItem";
import DBObject from "./DBObject";
import DBManager from "./DBManager";
import * as cheerio from 'cheerio';

export default class ReadingListItemDB extends DBObject {
    static tableName() {
        return 'reading_list_item';
    }

    static async getById(id: number): Promise<ReadingListItem> {
        return this.rows2Objects([await this._getById(id)])[0];
    }

    static async getByUrl(link: string): Promise<ReadingListItem> {
        return this.rows2Objects(
            await DBManager.fetch(`SELECT * FROM ${this.tableName()} WHERE link=?`, [link])
        )[0];
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
            item.addedOn,
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
                .replace('</title>', '');
        } else {
            // only load the full dom if we really need to
            const dom = cheerio.load(text);
            return dom('title').text();
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
        if (!rs)
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
                addedOn: result.added_on,
                domain: result.domain
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
                domain TEXT NOT NULL
            );
        `;
    }
}