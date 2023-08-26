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
    return link;
}

function getSpan(text) {
    const span = document.createElement('span');
    span.innerText = text;
    return span;
}