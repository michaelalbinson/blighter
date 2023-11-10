'use strict';

import ChatPreset from "./types/ChatPreset";
import DBManager from "../core/db/DBManager";
import DBObject from "../core/db/DBObject";

export default class ChatPresetsDB extends DBObject {
    static tableName(): string {
        return 'chat_preset';
    }

    static async getById(id: number): Promise<ChatPreset> {
        return ChatPresetsDB.rows2Objects([await this._getById(id)])[0];
    }

    static async getAll(): Promise<ChatPreset[]> {
        return ChatPresetsDB.rows2Objects(await this._getAll());
    }

    static async insert(preset: ChatPreset) {
        const sql = `
            INSERT INTO ${this.tableName()} (
                preset_text,
                preset_name
            ) VALUES (?, ?);
        `;

        const params = [
            preset.presetText,
            preset.presetName
        ];

        await DBManager.run(sql, params);
    }

    static async update(preset: ChatPreset): Promise<void> {
        await DBManager.run(`
            UPDATE ${this.tableName()} SET 
                 preset_text=?, preset_name=?
                 WHERE id=?
            `, [preset.presetText, preset.presetName, preset.id]
        );
    }

    static async delete(id: number): Promise<void> {
        await DBManager.run(`DELETE FROM ${this.tableName()} WHERE id=?`, [id]);
    }

    static tableSQL(): string {
        return `
            CREATE TABLE IF NOT EXISTS ${this.tableName()} (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               preset_text TEXT NOT NULL,
               preset_name TEXT NOT NULL UNIQUE
            );
        `;
    }

    static rows2Objects(rows: any[]): ChatPreset[] {
        let rs = rows;
        if (!rs || rs.length === 0)
            return [];

        if (!rs.length)
            rs = [rows];

        return rs.map(result => {
            return {
                id: result.id,
                presetName: result.preset_name,
                presetText: result.preset_text
            } as ChatPreset;
        });
    }
}