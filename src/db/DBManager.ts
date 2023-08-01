'use strict';

import {Database, RunResult} from "sqlite3";
import RSSFeedItem from "./RSSFeedItem";
import RSSFeed from "./RSSFeed";
import Logger from "../Logger";

class DBManager {
    private readonly db: Database;

    constructor() {
        this.db = new Database(process.env.DB_NAME || "blighter.db");
    }

    async setup(): Promise<void> {
        if (process.env.BOOTSTRAP) {
            await DBManager.bootstrap(this);
        }
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

    async query(sql: string, params: any[]|null): Promise<any[]>  {
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
            RSSFeed.tableSQL(),
            RSSFeedItem.tableSQL()
        ].map(async (sql) => {
            await db.run(sql, null);
        });

        await Promise.all(promises);
    }

    private static dbTrace(sql: string) {
        if (process.env.DB_TRACE)
            Logger.info(`db.trace: ${sql.replace(/[\t\n ]+/g, ' ').trim()}`);
    }
}

export default new DBManager();