'use strict';

export default class Logger {
    static log(msg: string) {
        console.log(this._withTimeStamp(msg));
    }

    static debug(msg: any) {
        if (!process.env.DEBUG)
            return;

        console.log(this._withTimeStamp(msg));
    }

    static error(msg: string) {
        console.error(this._withTimeStamp(msg));
    }

    static warn(msg: string) {
        console.warn(this._withTimeStamp(msg));
    }

    static info(msg: string) {
        console.log(this._withTimeStamp(msg));
    }

    private static _withTimeStamp(msg: string): string {
        return `${new Date().toISOString()} ${msg}`;
    }
}