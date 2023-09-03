'use strict';

import CompletionInput from "./CompletionInput";
import Timings from "./Timings";

export default interface CompletionResponse {
    content: string;
    generation_settings: CompletionInput;
    model: string;
    prompt: string;
    stop: boolean;
    stopped_eos: boolean;
    stopped_limit: boolean;
    stopped_word: boolean;
    stopping_word: string;
    timings: Timings;
    tokens_cached: number;
    tokens_evaluated: number;
    tokens_predicted: number;
    truncated: boolean;
}