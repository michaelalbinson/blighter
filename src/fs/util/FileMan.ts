'use strict';

import {
    readFile,
    writeFile,
    mkdir,
    stat,
    readdir
} from "fs/promises";

export default class FileMan {
    static async read(filePath: string): Promise<string> {
        if (!await FileMan.exists(filePath))
            throw new Error('File does not exist');

        return (await readFile(filePath)).toString();
    }

    static async exists(filePath: string): Promise<boolean> {
        try {
            await stat(filePath)
            return true;
        } catch (e) {
            return false;
        }
    }

    static async write(filePath: string, content: string): Promise<void> {
        await writeFile(filePath, content);
    }

    static async mkdir(dirPath: string) {
        await mkdir(dirPath);
    }

    static async dirCount(dirPath: string): Promise<number> {
        try {
            const stats = await readdir(dirPath);
            return stats.length;
        } catch (e) {
            return 0;
        }
    }
}