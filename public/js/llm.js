window.onload = async () => {
    'use strict';

    const chatContainer = document.querySelector('#chat-container');
    const userInput = document.querySelector('#user-input');
    const sendButton = document.querySelector('#send-message');
    const messages = chatContainer.querySelector('#chat-messages');

    const generateText = async function() {
        const prompt = userInput.value;

        messages.appendChild(getLi('User: ' + prompt));

        // Make an HTTP POST request to the llama.cpp backend to generate text.
        const response = await fetch('/llm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: messages.innerText + '\nAssistant: ' }),
        });

        // Once the request is complete, parse the response and display the generated text.
        const generatedLine = await response.text();
        messages.appendChild(getLi('Assistant: ' + generatedLine));
    };

    function getLi(text) {
        const chatMessage = document.createElement('li');
        chatMessage.textContent = text;
        return chatMessage;
    }

    sendButton.addEventListener('click', generateText);
}