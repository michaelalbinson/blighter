'use strict';

import API from "./API";
import ServiceHandles from "./ServiceHandles";

export default class LLM {
    static async generateChatResponse(prompt: string): Promise<string> {
        const res = await API.generateCompletion(prompt, ServiceHandles.LLAMA);
        return res.content;
    }

    static async generateCodeResponse(prompt: string): Promise<string> {
        const res = await API.generateCompletion(prompt, ServiceHandles.CODE_LLAMA);
        return res.content;
    }

    static async generateEmbedding(content: string): Promise<number[]> {
        const response = await API.generateEmbedding(content, ServiceHandles.LLAMA);
        return response.embedding;
    }
}