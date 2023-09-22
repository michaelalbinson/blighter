'use strict';

function getUrlParams() {
    const url = location.search.slice(1);
    const result = {};
    url.split("&").forEach((part) => {
        const item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

function button(text, clickFn) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', clickFn);
    return button;
}

function addLink(text, href) {
    const link = document.createElement('a');
    link.href = href;
    link.innerText = text;
    link.target = '_blank';
    return link;
}

function getSpan(text) {
    const span = document.createElement('span');
    span.innerText = text;
    return span;
}

function checkbox(text, clickFn) {
    const container = getSpan('');
    container.classList.add('checkbox-button');
    const identifier = text.toLowerCase().replace(' ', '_');
    const label = document.createElement('label');
    label.for = identifier;
    label.innerText = text;
    const input = document.createElement('input');
    input.name = identifier;
    input.type = 'checkbox';
    input.id = identifier;
    input.title = text;
    input.addEventListener('click', () => {
        input.checked ? label.classList.add('checked') : label.classList.remove('checked');
        clickFn(input)
    });
    container.appendChild(label);
    container.appendChild(input);
    return container;
}

function htmlBR() {
    return document.createElement('br');
}

function createElement(elName, attributes= {}) {
    const el = document.createElement(elName);
    for (let attrName in attributes)
        el.setAttribute(attrName, attributes[attrName]);

    if (attributes.text || attributes.innerText)
        el.innerText = attributes.text || attributes.innerText;

    if (attributes.value)
        el.value = attributes.value;

    return el;
}