'use strict';

export default interface CompletionInput {
    prompt: string | string[];

    // Adjust the randomness of the generated text. A higher temperature will result in more random text, while a lower temperature will result in more coherent text.
    temperature?: number;

    // Limit the next token selection to the K most probable tokens.
    top_k?: number;

    // Limit the next token selection to a subset of tokens with a cumulative probability above a threshold P.
    top_p?: number;

    // Set the number of tokens to predict when generating text.
    n_predict?: number;

    // Specify the number of tokens from the initial prompt to retain when the model resets its internal context.
    n_keep?: number;

    // Allows receiving each predicted token in real-time instead of waiting for the completion to finish.
    stream?: boolean;

    // Specify a JSON array of stopping strings. These words will not be included in the completion, so make sure to add them to the prompt for the next iteration.
    stop?: string[];

    // Enable tail free sampling with parameter z.
    tfs_z?: number;

    // Enable locally typical sampling with parameter p.
    typical_p?: number;

    // Control the repetition of token sequences in the generated text.
    repeat_penalty?: number;

    // Last n tokens to consider for penalizing repetition.
    repeat_last_n?: number;

    // Penalize newline tokens when applying the repeat penalty.
    penalize_nl?: boolean;

    // Repeat alpha presence penalty.
    presence_penalty?: number;

    // Repeat alpha frequency penalty.
    frequency_penalty?: number;

    // Enable Mirostat sampling, controlling perplexity during text generation.
    mirostat?: number;

    // Set the Mirostat target entropy, parameter tau.
    mirostat_tau?: number;

    // Set the Mirostat learning rate, parameter eta.
    mirostat_eta?: number;

    // Set grammar for grammar-based sampling.
    grammar?: string;

    // Set the random number generator (RNG) seed.
    seed?: number;

    // Ignore end of stream token and continue generating.
    ignore_eos?: boolean;

    // Modify the likelihood of a token appearing in the generated text completion.
    // For example, use "logit_bias": [[15043,1.0]] to increase the likelihood of the token 'Hello', or "logit_bias": [[15043,-1.0]] to decrease its likelihood. Setting the value to false, "logit_bias": [[15043,false]] ensures that the token Hello is never produced.
    logit_bias?: [[number, number]] | [[number, boolean]];
}
