'use strict';

import LLMService from "./types/LLMService";
import ServiceStatus from "./types/ServiceStatus";

const ServiceHandles = {
    CODE_LLAMA: {
        contextLength: 2048,
        llmFile: 'vicuna-7b-v1.3.ggmlv3.q4_1.bin', // TODO REPLACE
        port: 8091,
        humanName: 'Code LLAMA (v2)'
    } as LLMService,
    LLAMA: {
        contextLength: 2048,
        llmFile: 'vicuna-7b-v1.3.ggmlv3.q4_1.bin', // TODO REPLACE
        port: 8092,
        humanName: 'LLAMA Chat (v2)'
    } as LLMService
}

export default ServiceHandles;