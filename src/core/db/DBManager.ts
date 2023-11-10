'use strict';

import {Database, RunResult} from "sqlite3";
import FeedItemDB from "../../rss/FeedItemDB";
import RSSFeedDB from "../../rss/RSSFeedDB";
import Logger from "../../Logger";
import NoteDB from "./NoteDB";
import ReadingListItemDB from "../../reading_list/ReadingListItemDB";
import ChatPresetsDB from "../../llm/ChatPresetsDB";
import {join} from "path";

class DBManager {
    private readonly db: Database;

    constructor() {
        this.db = new Database(join(__dirname, '..', '..', '..', process.env.DB_NAME || "blighter.db"));
    }

    async setup(): Promise<void> {
        if (process.env.BOOTSTRAP)
            await DBManager.bootstrap(this);
    }

    async fetch(sql: string, params: any[]|null): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const handleResponse = (err: Error|null, rows: any[]) => {
                if (err) {
                    Logger.debug(err);
                    reject(err);
                }

                resolve(rows);
            };

            DBManager.dbTrace(sql);
            if (params)
                this.db.get(sql, params, handleResponse);
            else
                this.db.get(sql, handleResponse);
        });
    }

    async query(sql: string, params?: any[]): Promise<any[]>  {
        if (!params)
            params = [];

        return new Promise((resolve, reject) => {
            const handleResponse = (err: Error|null, rows: any[]) => {
                if (err) {
                    Logger.debug(err);
                    reject(err);
                }

                resolve(rows);
            };

            DBManager.dbTrace(sql);
            if (params)
                this.db.all(sql, params, handleResponse);
            else
                this.db.all(sql, handleResponse);
        });
    }

    async run(sql: string, params: any[]|null): Promise<RunResult> {
        return new Promise((resolve, reject) => {
            const handleResponse = (err: Error|null, res: RunResult) => {
                if (err) {
                    Logger.debug(err);
                    reject(err);
                }

                resolve(res);
            };

            DBManager.dbTrace(sql);
            if (params)
                this.db.run(sql, params, handleResponse);
            else
                this.db.run(sql, handleResponse);
        });
    }

    static async bootstrap(db: DBManager): Promise<void> {
        Logger.info('Bootstrapping tables');
        const promises = [
            RSSFeedDB.tableSQL(),
            FeedItemDB.tableSQL(),
            NoteDB.tableSQL(),
            ReadingListItemDB.tableSQL(),
            ChatPresetsDB.tableSQL()
        ].map(async (sql) => {
            await db.run(sql, null);
        });

        await Promise.all(promises);
    }

    private static dbTrace(sql: string) {
        if (process.env.DB_TRACE === 'true' || process.env.DB_TRACE === '1')
            Logger.info(`db.trace: ${sql.replace(/[\t\n ]+/g, ' ').trim()}`);
    }
}

export default new DBManager();