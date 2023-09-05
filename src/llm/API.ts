'use strict';

import Logger from "../Logger";
import LLMService from "./types/LLMService";
import ServiceManager from "./ServiceManager";
import EmbeddingInput from "./types/EmbeddingInput";
import CompletionInput from "./types/CompletionInput";
import CompletionResponse from "./types/CompletionResponse";
import EmbeddingResponse from "./types/EmbeddingResponse";

export default class API {
    private static readonly serviceMan: ServiceManager = new ServiceManager(); // keep this as a singleton to reduce multithreading complexity

    static async generateEmbedding(content: string, service: LLMService): Promise<EmbeddingResponse> {
        await API.serviceMan.ensureServiceRunning(service);
        const response = await API.makeRequest(service, 'embedding', {
            content
        } as EmbeddingInput);
        return response as EmbeddingResponse;
    }

    static async generateCompletion(prompt: string, service: LLMService): Promise<CompletionResponse> {
        await API.serviceMan.ensureServiceRunning(service);
        const response = await API.makeRequest(service, 'completion', {
            prompt,
            temperature: 0.2
        } as CompletionInput);
        Logger.debug(JSON.stringify(response));
        return response as CompletionResponse;
    }

    private static async makeRequest(service: LLMService, route: string, data: object): Promise<object> {
        const url = `http://localhost:${service.port}/${route}`;
        Logger.debug(`Making request to ${url}`);
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            Logger.error(`Request to ${url} failed`);
            Logger.debug(await res.text());
            throw new Error('Request failed');
        }

        Logger.debug(`Request to ${url} complete`);
        return await res.json();
    }

    static async testSeam_killAll() {
        await API.serviceMan.killAll();
    }
}