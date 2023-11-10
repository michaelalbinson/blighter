'use strict';

import {Express} from "express";
import WebUtils from "./WebUtils";
import LLM from "../llm";
import Logger from "../Logger";
import ChatPresetsDB from "../llm/ChatPresetsDB";
import ChatPreset from "../llm/types/ChatPreset";

export default function setupLLMRoutes(app: Express) {
    app.get('/llm', (req, res) => {
        WebUtils.sendPublicFile(res, 'llm.html');
    });

    app.post('/llm', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const prompt = (req.body as {prompt: string}).prompt;

            // sometimes the first response from the llm comes back empty, so try again if that happens
            let response = '';
            let retries = 0;
            do {
                try {
                    response = (await LLM.generateChatResponse(prompt)).trim();
                } catch (e) {
                    Logger.error('LLM request failed, retrying...');
                    Logger.error(e);
                    // wait a bit before retrying
                    await WebUtils.sleep(300);
                    retries++;
                }
            } while(response === '' && retries < 5);

            res.status(200).send(response);
        });
    });

    app.get('/presets', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const id = req.query['id'] as string|undefined;
            if (id) {
                res.status(200).send(await ChatPresetsDB.getById(Number(id)));
            } else
                res.status(200).send(await ChatPresetsDB.getAll());
        });
    });

    app.post('/presets', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const preset = (req.body as {presetText: string, presetName: string, id?: number});
            if (!preset.presetText || !preset.presetName)
                return res.status(400).send();

            const presetToUpsert = {
                presetText: preset.presetText,
                presetName: preset.presetName,
                id: preset.id || -1
            } as ChatPreset;

            if (preset.id)
                await ChatPresetsDB.update(presetToUpsert);
            else
                await ChatPresetsDB.insert(presetToUpsert);

            res.status(200).redirect('/llm');
        });
    });

    app.delete('/presets', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const presetId = (req.body as {id?: number}).id;
            if (!presetId)
                return res.status(400).send();

            await ChatPresetsDB.delete(presetId);
            res.status(200).send();
        });
    });

    app.get('/manage-presets', (req, res) => {
        WebUtils.sendPublicFile(res, 'manage-presets.html');
    });

    app.get('/add-preset', (req, res) => {
        WebUtils.sendPublicFile(res, 'add-preset.html');
    });
}