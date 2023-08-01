'use strict';

export default class Logger {
    static log(msg: string) {
        console.log(msg);
    }

    static debug(msg: any) {
        if (!process.env.DEBUG)
            return;

        console.log(msg);
    }

    static error(msg: string) {
        console.error(msg);
    }

    static warn(msg: string) {
        console.warn(msg);
    }

    static info(msg: string) {
        console.log(msg);
    }
}