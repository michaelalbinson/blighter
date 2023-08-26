'use strict';

export default interface DataSourceType {
    id: number,
    title: string,
    link: string,
    saved: boolean,
    read: boolean,
    hasNote: boolean,
    pubDate: string
}