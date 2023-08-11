window.onload = async () => {
    'use strict';

    const settings = window.blighterClientSettings.getAll();
    const form = document.getElementById('settings-form');
    for (let setting in settings) {
        if (!settings.hasOwnProperty(setting))
            continue;

        const label = document.createElement('label');
        label.innerText = setting;
        label.for = setting;
        const input = document.createElement('input');
        input.name = setting;
        input.type = typeof settings[setting] === 'number' ? 'number' : 'string';
        input.value = settings[setting];
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    }

    const button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Submit';
    form.appendChild(button);

    form.addEventListener('submit', () => {
        const inputs = form.getElementsByTagName('input');
        for (let input of inputs)
            window.blighterClientSettings.set(input.name, coerce(input.value, input.type));

    });

    function coerce(value, toType) {
        if (toType === 'number')
            return Number(value);
        else
            return value;
    }

    function submitButton(text, fn) {
        const button = document.createElement('button');
        button.type = 'submit';
        button.innerText = text;
    }
};