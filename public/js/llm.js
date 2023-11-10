window.onload = async () => {
    'use strict';

    const NONE_PRESET = '-- None --';
    const PRESETS = {};

    const chatContainer = document.querySelector('#chat-container');
    const userInput = document.querySelector('#user-input');
    const sendButton = document.querySelector('#send-message');
    const messages = chatContainer.querySelector('#chat-messages');
    const presetSelect = document.querySelector('#chat-preset');

    let currentPreset = {
        presetText: NONE_PRESET
    };

    const converter = new showdown.Converter();
    const DEFAULT_CHAT = [
        'SYSTEM: REPLACE_ME',
        'User: Good morning!',
        'Assistant: Good morning! How may I help you today?'
    ];
    let chat = DEFAULT_CHAT.slice();
    window.top.__CHAT = chat;

    const generateText = async function() {
        const prompt = 'User: ' + userInput.value;
        chat.push(prompt);
        userInput.setAttribute('disabled', 'disabled');
        sendButton.setAttribute('disabled', 'disabled');
        userInput.value = '';

        messages.appendChild(getLi(prompt));

        // Make an HTTP POST request to the llama.cpp backend to generate text.
        const response = await fetch('/llm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: chat.join('\n')+ '\nAssistant: ' }),
        });

        // Once the request is complete, parse the response and display the generated text.
        const generatedLine = await response.text();
        const responseText = 'Assistant: ' + generatedLine.trim();
        chat.push(responseText);
        messages.appendChild(getLi(responseText, true));
        userInput.removeAttribute('disabled');
        sendButton.removeAttribute('disabled');
    };

    function getLi(text, useMarkdown = false) {
        const chatMessage = document.createElement('li');
        if (useMarkdown)
            chatMessage.innerHTML = converter.makeHtml(text);
        else
            chatMessage.innerText = text;

        return chatMessage;
    }

    const resetChat = () => {
        for (let child of Array.from(messages.childNodes))
            child.remove();

        chat = DEFAULT_CHAT.slice();
        window.top.__CHAT = chat;
        if (currentPreset.presetName === NONE_PRESET)
            chat = chat.slice(1);
        else
            chat[0] = `SYSTEM: ${currentPreset.presetText}`;

        for (let text of chat) {
            if (text.startsWith('SYSTEM:'))
                continue;

            messages.appendChild(getLi(text));
        }
    }

    const resetChatWithPreset = () => {
        const answer = confirm('Are you sure you want to change presets? This will delete your current conversation.');
        if (!answer) {
            presetSelect.value = currentPreset;
            return;
        }

        currentPreset = PRESETS[presetSelect.value];
        resetChat();
        window.blighterClientSettings.set('llmPreset', presetSelect.value);
    }

    const loadPresets = async () => {
        const req = await fetch('/presets');
        if (!req.ok)
            return;

        const presets = await req.json();
        const NONE_PRESET_OBJ = {presetName: NONE_PRESET, id: -1}
        presets.push(NONE_PRESET_OBJ);
        for (let preset of presets) {
            PRESETS[preset.presetName] = preset;
            const opt = createElement('option');
            opt.id = preset.id;
            opt.innerText = preset.presetName;
            presetSelect.appendChild(opt);
        }

        let lastCachedSetting = window.blighterClientSettings.get('llmPreset');
        if (lastCachedSetting) {
            presetSelect.value = lastCachedSetting;
            currentPreset = PRESETS[lastCachedSetting];
        } else {
            presetSelect.value = NONE_PRESET;
            currentPreset = NONE_PRESET_OBJ;
        }
    }

    sendButton.addEventListener('click', generateText);
    presetSelect.addEventListener('change', resetChatWithPreset);
    await loadPresets();
    resetChat();
}