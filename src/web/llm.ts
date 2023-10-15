'use strict';

import {Express} from "express";
import WebUtils from "./WebUtils";
import LLM from "../llm";
import Logger from "../Logger";

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
}