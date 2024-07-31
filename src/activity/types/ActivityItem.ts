'use strict';

export default interface ActivityItem {
    id: number,
    description: string,
    created: string,
    updated: string,
    completed: boolean,
    deferred: boolean,
    priority: number
}