'use strict';

import {Express} from "express";
import {join} from "path";
import NoteFS from "../fs/NoteFS";
import RSSFeedItem from "../db/RSSFeedItem";
import NoteDB from "../db/NoteDB";
import ReadingListItem from "../db/types/ReadingListItem";
import FeedItem from "../db/types/FeedItem";
import it from "node:test";

export default function setupNoteRoutes(app: Express) {
    app.get('/item-note', (req, res) => {
        res.status(200).sendFile(join(process.cwd(), 'public/note.html'));
    });

    const resolveItem = async (itemId: string): Promise<FeedItem | ReadingListItem> => {
        let item: FeedItem|ReadingListItem;
        if (itemId.includes('feed_item')) {
            const feedItemId = Number(itemId.split('feed_item-')[1])
            item = await RSSFeedItem.getById(feedItemId);
        } else
            throw new Error('yikes');

        return item;
    };

    const setHasNote = async (itemId: string): Promise<void> => {
        if (itemId.includes('feed_item')) {
            const feedItemId = Number(itemId.split('feed_item-')[1])
            await RSSFeedItem.setHasNote(feedItemId);
        } else
            throw new Error('yikes');
    };

    app.get('/note', async(req, res) => {
        const itemId = req.query['itemId'] as string;
        if (!itemId)
            return res.status(400).send();

        const item = await resolveItem(itemId);
        if (await NoteDB.existsForUrl(item.link)) {
            const dbNote = await NoteDB.getByArticleUrl(item.link);
            const note = await NoteFS.read(dbNote.url);
            res.status(200).send(note);
        } else
            res.status(404).send();
    });

    app.post('/note', async (req, res) => {
        const itemId = (req.body as {itemId: string}).itemId;
        const noteContent = (req.body as {note: string}).note;
        if (!itemId)
            return res.status(400).send();

        const item = await resolveItem(itemId);
        if (await NoteDB.existsForUrl(item.link)) {
            const note = await NoteDB.getByArticleUrl(item.link);
            await NoteFS.update(note.url, noteContent);
            await NoteDB.update(note);
        } else {
            const note = await NoteFS.create(item, noteContent);
            await NoteDB.insert(note);
            await setHasNote(itemId);
        }

        res.redirect('back');
    });
}