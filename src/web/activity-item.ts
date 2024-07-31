'use strict';

import {Express} from "express";
import ActivityItemDB from "../activity/ActivityItemDB";
import WebUtils from "./WebUtils";
import ActivityItem from "../activity/types/ActivityItem";

export default function setupActivityRoutes(app: Express) {
    app.get('/activity-items', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const items = await ActivityItemDB.getAll();
            res.status(200).send(items);
        });
    });

    app.get('/activity-items/active', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const items = await ActivityItemDB.getActive();
            res.status(200).send(items);
        });
    });

    app.get('/activity-items/deferred', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const items = await ActivityItemDB.getDeferred();
            res.status(200).send(items);
        });
    });

    app.get('/activity-items/completed', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const items = await ActivityItemDB.getCompleted();
            res.status(200).send(items);
        });
    });

    app.get('/activity-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const id = req.query['id'] as string;
            if (!id)
                return res.status(400).send();

            const item = await ActivityItemDB.getById(Number(id));
            res.status(200).send(item);
        });
    });

    app.post('/activity-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            if (req.body.id) {
                const updateItem = (req.body as { description: string, priority: string, id: string });
                await ActivityItemDB.update(Number(updateItem.id), updateItem.description, Number(updateItem.priority));
                res.status(200).redirect('/activity-tracker/');
                return;
            } else {
                const newItem = (req.body as { description: string, priority: number });
                await ActivityItemDB.insert(newItem.description, Number(newItem.priority));
                res.status(200).redirect('/activity-tracker/');
            }
        });
    });

    app.delete('/activity-item', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const item = (req.body.item as ActivityItem).id;
            await ActivityItemDB.delete(Number(item));
            res.status(200).send();
        });
    });

    app.post('/activity-item/defer', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const item = (req.body.item as ActivityItem);
            await ActivityItemDB.setDeferred(Number(item.id), !item.deferred);
            res.status(200).send();
        });
    });

    app.post('/activity-item/complete', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const item = (req.body.item as ActivityItem);
            await ActivityItemDB.setCompleted(Number(item.id), !item.completed);
            res.status(200).send();
        });
    });
}