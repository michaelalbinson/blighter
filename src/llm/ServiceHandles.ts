'use strict';

import LLMService from "./types/LLMService";
import ServiceStatus from "./types/ServiceStatus";

const ServiceHandles = {
    CODE_LLAMA: {
        contextLength: 2048,
        llmFile: 'codellama-7b-instruct.Q5_K_M.gguf', // TODO REPLACE
        port: 8091,
        humanName: 'Code LLAMA (v2)'
    } as LLMService,
    LLAMA: {
        contextLength: 2048,
        llmFile: 'llama-2-7b-chat.Q5_K_M.gguf', // TODO REPLACE
        port: 8092,
        humanName: 'LLAMA Chat (v2)'
    } as LLMService
}

export default ServiceHandles;