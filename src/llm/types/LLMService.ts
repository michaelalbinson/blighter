'use strict';

export default interface LLMService {
    contextLength: number,
    llmFile: string,
    port: number,
    humanName: string
}