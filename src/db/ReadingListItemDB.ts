'use strict';

import ReadingListItem from "./types/ReadingListItem";
import DBObject from "./DBObject";

export default class ReadingListItemDB extends DBObject {
    static tableName() {
        return 'reading_list_item';
    }

    static async getById(): Promise<ReadingListItem> {
        return {} as ReadingListItem;
    }

    static async getByUrl(): Promise<ReadingListItem> {
        return {} as ReadingListItem;
    }

    static async getAll(): Promise<ReadingListItem[]> {
        return [];
    }

    static async getArticleTitle(url: string) {
        const res = await fetch(url, {headers: {'User-agent': 'googlebot'}});
        if (!res.ok)
            throw new Error('Failed to GET webpage')
    }

    static rows2Objects(rows: any[]): ReadingListItem[] {
        let rs = rows;
        if (!rs)
            return [];

        if (!rs.length)
            rs = [rows];

        return rs.map(result => {
            return {

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
                saved BOOLEAN NOT NULL DEFAULT FALSE
            );
        `;
    }
}