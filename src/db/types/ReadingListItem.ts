'use strict';

export default interface ReadingListItem {
    id: number,
    title: string,
    link: string,
    read: boolean,
    saved: boolean,
    addedOn: string,
    domain: string,
    hasNote: boolean
}