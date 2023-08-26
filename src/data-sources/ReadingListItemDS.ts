'use strict';

import ReadingListItem from "../db/reading_list/types/ReadingListItem";
import DataSource from "./DataSource";
import ReadingListItemDB from "../db/reading_list/ReadingListItemDB";

class ReadingListItemDS implements DataSource<ReadingListItem> {
    async getActive(): Promise<ReadingListItem[]> {
        return await ReadingListItemDB.getAll();
    }

    async getAll(): Promise<ReadingListItem[]> {
        return await ReadingListItemDB.getAll();
    }

    async getAnnotated(): Promise<ReadingListItem[]> {
        return await ReadingListItemDB.getAnnotated();
    }

    async getSaved(): Promise<ReadingListItem[]> {
        return await ReadingListItemDB.getSaved();
    }

    async getUnread(): Promise<ReadingListItem[]> {
        return []; // TODO: implement
    }
}

export default new ReadingListItemDS();