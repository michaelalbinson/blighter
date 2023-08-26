'use strict';

import DBManager from "./DBManager";

export default class DBObject {
    static tableName() {
        throw new Error('Missing table name');
    }

    static async _getById(id: number): Promise<any> {
        const sql = `SELECT * FROM ${this.tableName()} WHERE id=?`;
        return await DBManager.fetch(sql, [id]);
    }

    static async _getAll(): Promise<any[]> {
        const sql = `SELECT * FROM ${this.tableName()}`;
        return await DBManager.query(sql, []);
    }
}