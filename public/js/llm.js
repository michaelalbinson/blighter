window.onload = async () => {
    'use strict';

    const chatContainer = document.querySelector('#chat-container');
    const userInput = document.querySelector('#user-input');
    const sendButton = document.querySelector('#send-message');
    const messages = chatContainer.querySelector('#chat-messages');

    const converter = new showdown.Converter();
    const CHAT = [
        'User: Good morning!',
        'Assistant: Good morning! How may I help you today?'
    ];
    window.top.__CHAT = CHAT;

    const generateText = async function() {
        const prompt = 'User: ' + userInput.value;
        CHAT.push(prompt);
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
            body: JSON.stringify({ prompt: CHAT.join('\n')+ '\nAssistant: ' }),
        });

        // Once the request is complete, parse the response and display the generated text.
        const generatedLine = await response.text();
        const responseText = 'Assistant: ' + generatedLine.trim();
        CHAT.push(responseText);
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

    sendButton.addEventListener('click', generateText);
}