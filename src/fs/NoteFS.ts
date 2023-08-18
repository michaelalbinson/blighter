'use strict';

import Note from "./types/Note";
import FileMan from "./util/FileMan";
import FileHeaderContent from "./types/FileHeaderContent";
import ReadingListItem from "../db/types/ReadingListItem";
import FeedItem from "../db/types/FeedItem";
import {join} from "path";

export default class NoteFS {
    static YAML_DELIMITER = '-----------------------\n';
    static MONTH_2_DIR_MAP = [
        '01-jan', '02-feb', '03-mar',
        '04-apr', '05-may', '06-jun',
        '07-jul', '08-aug', '09-sep',
        '10-oct', '11-nov', '12-dev'
    ];
    static NOTE_ROOT_PATH = join(__dirname, '..', '..', 'public', 'content', 'notes'); // consider overridable

    static async read(fileUrl: string): Promise<Note> {
        const notePath = NoteFS.getNoteUrl(fileUrl);
        const content = await FileMan.read(notePath);
        const splitContent = content.match(/-{3,}[\w\W]+-{3,}/gim);
        if (!splitContent)
            throw new Error('Invalid note for blighter - a markdown header is required');

        const header = splitContent[0];
        const body = content.replace(header, '').trim();
        const headerContent = this.parseHeader(header);
        return {
            content: body,
            url: fileUrl,
            articleUrl: headerContent.articleUrl,
            articleTitle: headerContent.articleTitle,
            createdOn: headerContent.createdOn,
            updatedOn: headerContent.updatedOn,
        } as Note;
    }

    static parseHeader(fileHeaderContent: string): FileHeaderContent {
        const headerContent = {} as FileHeaderContent;
        fileHeaderContent.split('\n')
            .map((it: string) => {
                const allSections = it.trim().split(':');
                const key = allSections[0];
                const value = allSections.slice(1).join(':').trim();
                switch (key) {
                    case "articleUrl":
                        headerContent.articleUrl = value; break;
                    case "articleTitle":
                        headerContent.articleTitle = value; break;
                    case "createdOn":
                        headerContent.createdOn = value; break;
                    case "updatedOn":
                        headerContent.createdOn = value; break
                }
            });

        return headerContent;
    }

    static getNoteUrl(filePath: string): string {
        return filePath.includes(this.NOTE_ROOT_PATH) ? filePath : join(this.NOTE_ROOT_PATH, filePath);
    }

    static async create(item: ReadingListItem|FeedItem, content: string): Promise<Note> {
        const now = new Date().toISOString()
        const note = {
            content,
            createdOn: now,
            updatedOn: now,
            articleTitle: item.title,
            articleUrl: item.link
        } as Note;

        const noteUrl = await NoteFS.getFilePath(note, true);

        await FileMan.write(noteUrl, NoteFS.toContent(note));

        note.url = noteUrl.replace(NoteFS.NOTE_ROOT_PATH, '');
        return note;
    }

    static async update(filePath: string, newContent: string): Promise<Note> {
        const notePath = NoteFS.getNoteUrl(filePath);
        const oldNote = await this.read(notePath);
        oldNote.content = newContent;
        oldNote.updatedOn = new Date().toISOString();
        await FileMan.write(notePath, NoteFS.toContent(oldNote));
        return oldNote;
    }

    static async getFilePath(note: Note, isNew: boolean): Promise<string> {
        const createdOn = new Date(note.createdOn);
        const dirPath = join(
            NoteFS.NOTE_ROOT_PATH,
            createdOn.getFullYear().toString(),
            NoteFS.MONTH_2_DIR_MAP[createdOn.getMonth()]
        );
        return join(
            dirPath,
            isNew ? await NoteFS.newFileName(dirPath, note) : note.url
        );
    }

    static async newFileName(dirPath: string, note: Note): Promise<string> {
        let dirCount = await FileMan.dirCount(dirPath);
        let dirCountStr = dirCount.toString();
        if (dirCount < 10)
            dirCountStr = `0${dirCountStr}`;

        return `${dirCountStr}-${note.articleTitle.replace(/[ \n\t:;|?!./\\\[\](){}<>,_+=@#$%^&*"']+/g, '-').slice(0, 40)}.md`;
    }

    static toContent(note: Note): string {
        console.log(this.headerContent(note));
        return this.headerContent(note) + '\n' + note.content;
    }

    static headerContent(from: Note): string {
        return NoteFS.YAML_DELIMITER +
            `articleUrl: ${from.articleUrl}\n` +
            `articleTitle: ${from.articleTitle}\n` +
            `createdOn: ${from.createdOn}\n` +
            `updatedOn: ${from.updatedOn}\n` +
            NoteFS.YAML_DELIMITER;
    }
}