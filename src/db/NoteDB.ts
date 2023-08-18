'use strict';

import Note from "../fs/types/Note";
import DBObject from "./DBObject";
import DBManager from "./DBManager";

export default class NoteDB extends DBObject {
    static tableName() {
        return 'note';
    }

    static async getById(id: number): Promise<Note> {
        return NoteDB.rows2Objects(await this._getById(id))[0];
    }

    static async existsForUrl(url: string): Promise<boolean> {
        return !!((await this.getByArticleUrl(url))?.url);
    }

    static async getByArticleUrl(url: string): Promise<Note> {
        return NoteDB.rows2Objects(
            await DBManager.fetch(`SELECT * FROM ${this.tableName()} WHERE article_link=?`, [url])
        )[0];
    }

    static async getAll(): Promise<Note[]> {
        return NoteDB.rows2Objects(await this._getAll());
    }

    static async insert(note: Note) {
        const sql = `
            INSERT INTO ${NoteDB.tableName()} (
                url,
                article_title,
                article_link,
                created_on,
                updated_on
            ) VALUES (?, ?, ?, ?, ?)
        `;

        const params = [
            note.url,
            note.articleTitle,
            note.articleLink,
            note.createdOn,
            note.updatedOn,
        ];

        await DBManager.run(sql, params);
    }

    static async update(note: Note) {
        const sql = `
            UPDATE ${NoteDB.tableName()} SET updated_on=? WHERE id=?
        `;

        const params = [
            note.updatedOn,
            note.id
        ];

        await DBManager.run(sql, params);
    }

    static rows2Objects(rows: any[]): Note[] {
        let rs = rows;
        if (!rs)
            return [];

        if (!rs.length)
            rs = [rows];

        return rs.map(result => {
            return {
                id: result.id,
                articleTitle: result.article_title,
                articleLink: result.article_link,
                url: result.url,
                updatedOn: result.updated_on,
                createdOn: result.created_on
            } as Note;
        });
    }

    static tableSQL(): string {
        return `
            CREATE TABLE IF NOT EXISTS ${NoteDB.tableName()} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                article_title TEXT NOT NULL,
                article_link TEXT NOT NULL UNIQUE,
                url TEXT NOT NULL UNIQUE,
                updated_on TEXT NOT NULL,
                created_on TEXT NOT NULL
            );
        `;
    }
}