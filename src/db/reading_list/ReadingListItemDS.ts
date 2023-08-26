'use strict';

import ReadingListItem from "./types/ReadingListItem";
import DataSource from "../../data-sources/DataSource";
import ReadingListItemDB from "./ReadingListItemDB";

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
        return await ReadingListItemDB.getUnread();
    }
}

export default new ReadingListItemDS();