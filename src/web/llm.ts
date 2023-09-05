'use strict';

import {Express} from "express";
import WebUtils from "./WebUtils";
import LLM from "../llm";

export default function setupLLMRoutes(app: Express) {
    app.get('/llm', (req, res) => {
        WebUtils.sendPublicFile(res, 'llm.html');
    });

    app.post('/llm', async (req, res) => {
        await WebUtils.defaultReqHandling(req, res, async () => {
            const prompt = (req.body as {prompt: string}).prompt;
            const response = await LLM.generateChatResponse(prompt);
            res.status(200).send(response);
        });
    });
}