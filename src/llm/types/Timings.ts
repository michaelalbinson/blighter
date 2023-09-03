'use strict';

export default interface Timings {
    predicted_ms: number;
    predicted_n: number;
    predicted_per_second: number;
    predicted_per_token_ms: number;
    prompt_ms: number;
    prompt_n: number;
    prompt_per_second: number;
    prompt_per_token_ms: number;
}