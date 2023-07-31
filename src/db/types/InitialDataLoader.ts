import {readFileSync} from "fs";
import {join} from "path";
import RSSManager from "../../rss/RSSManager";
import Logger from "../../Logger";

export default class InitialDataLoader {
    static async loadDefaultData() {
        const promises = readFileSync(join(process.cwd(), './db/preload.yaml')).toString()
            .split('\n')
            .map(async (it) => {
                try {
                    await RSSManager.discoverAndInsert(it)
                } catch (e) {
                    Logger.error(`Failed to discover feed at ${it}`);
                }
            });

        await Promise.all(promises);
    }
}