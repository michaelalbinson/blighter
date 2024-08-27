'use strict';

import ActivityItem from "./types/ActivityItem";
import DBManager from "../core/db/DBManager";
import DBObject from "../core/db/DBObject";

export default class ActivityItemDB extends DBObject {
    static tableName(): string {
        return 'activity_item';
    }

    static async getById(id: number): Promise<ActivityItem> {
        return ActivityItemDB.rows2Objects([await this._getById(id)])[0];
    }

    static async getAll(): Promise<ActivityItem[]> {
        return ActivityItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM ${this.tableName()} ORDER BY updated DESC;`)
        );
    }

    static async getActive(): Promise<ActivityItem[]> {
        return ActivityItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM ${this.tableName()} WHERE completed = false AND deferred = false ORDER BY priority, updated;`)
        );
    }

    static async getDeferred(): Promise<ActivityItem[]> {
        return ActivityItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM ${this.tableName()} WHERE completed = false AND deferred = true ORDER BY priority, updated;`)
        );
    }

    static async getCompleted(): Promise<ActivityItem[]> {
        return ActivityItemDB.rows2Objects(
            await DBManager.query(`SELECT * FROM ${this.tableName()} WHERE completed = true ORDER BY updated;`)
        );
    }

    static async setDeferred(id: number, deferred: boolean): Promise<void> {
        await DBManager.run(`UPDATE ${this.tableName()} SET deferred = ?, updated = ? WHERE id = ?;`, [deferred, this.now(), id]);
    }

    static async setCompleted(id: number, completed: boolean): Promise<void> {
        await DBManager.run(`UPDATE ${this.tableName()} SET completed = ?, updated = ? WHERE id = ?;`, [completed, this.now(), id]);
    }

    static async update(id: number, description: string, priority: number): Promise<void> {
        await DBManager.run(
            `UPDATE ${this.tableName()} SET description = ?, priority = ? WHERE id = ?;`,
            [description, priority, id]
        );
    }

    static async delete(id: number): Promise<void> {
        await DBManager.run(`DELETE FROM ${this.tableName()} WHERE id = ?;`, [id]);
    }

    static async insert(description: string, priority: number) {
        const sql = `INSERT INTO ${this.tableName()} (description, priority, created, updated) VALUES (?, ?, ?, ?);`;
        const params = [description, priority, this.now(), this.now()];
        await DBManager.run(sql, params);
    }

    static now() {
        return new Date().toISOString();
    }

    static tableSQL(): string {
        return `
            CREATE TABLE IF NOT EXISTS ${this.tableName()} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL,
                created TEXT NOT NULL,
                updated TEXT NOT NULL,
                priority INTEGER NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT FALSE,
                deferred BOOLEAN NOT NULL DEFAULT FALSE
            );
        `;
    }

    static rows2Objects(rows: any[]): ActivityItem[] {
        let rs = rows;
        if (!rs || rs.length === 0)
            return [];

        if (!rs.length)
            rs = [rows];

        return rs.map(result => {
            return {
                id: result.id,
                description: result.description,
                created: result.created,
                updated: result.updated,
                completed: result.completed,
                deferred: result.deferred,
                priority: result.priority
            } as ActivityItem;
        });
    }
}