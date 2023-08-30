'use strict';

import {Express} from "express";
import NoteFS from "../core/fs/NoteFS";
import FeedItemDB from "../rss/FeedItemDB";
import NoteDB from "../core/db/NoteDB";
import ReadingListItemDB from "../reading_list/ReadingListItemDB";
import WebUtils from "./WebUtils";

export default function setupNoteRoutes(app: Express) {
    app.get('/item-note', (req, res) => {
        WebUtils.sendPublicFile(res, 'note.html');
    });

    const setHasNote = async (itemId: string): Promise<void> => {
        if (itemId.includes('feed_item')) {
            const feedItemId = Number(itemId.split('feed_item-')[1])
            await FeedItemDB.setHasNote(feedItemId);
        } else if (itemId.includes('reading_list_item')) {
            const feedItemId = Number(itemId.split('reading_list_item-')[1])
            await ReadingListItemDB.setHasNote(feedItemId);
        } else
            throw new Error('yikes');
    };

    app.get('/note', async(req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = req.query['itemId'] as string;
            if (!itemId)
                return res.status(400).send();

            const item = await WebUtils.resolveItem(itemId);
            if (await NoteDB.existsForUrl(item.link)) {
                const dbNote = await NoteDB.getByArticleUrl(item.link);
                const note = await NoteFS.read(dbNote.url);
                res.status(200).send(note);
            } else
                res.status(404).send();
        });
    });

    app.post('/note', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const itemId = (req.body as {itemId: string}).itemId;
            const noteContent = (req.body as {note: string}).note;
            if (!itemId)
                return res.status(400).send();

            const item = await WebUtils.resolveItem(itemId);
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
    });
}