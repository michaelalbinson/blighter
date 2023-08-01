window.onload = async () => {
    'use strict';


    const urlParams = getUrlParams();
    const url = window.location.href.includes('single-feed') ? `/feed?id=${urlParams.id}` : '/feed';
    const data = await fetch(url);
    if (!data.ok)
        throw new Error('Failed to load feed data');

    const listRoot = document.getElementById('list');
    const listing = await data.json();
    for (let el of listing) {
        const link = document.createElement('a');
        link.href = el.link;
        link.target = '_blank';
        link.innerText = el.title;
        const span = document.createElement('span');
        span.innerText = new Date(el.pubDate).toString() + " - ";
        const a2 = document.createElement('a');
        a2.innerText = el.feed.name;
        a2.href = `/single-feed?id=${el.feed.id}`;
        span.appendChild(a2);
        const span2 = document.createElement('span');
        span2.innerText = el.categories;
        const li = document.createElement('li');
        li.appendChild(link);
        li.appendChild(document.createElement('br'));
        li.appendChild(span);
        li.appendChild(document.createElement('br'));
        li.appendChild(span2);
        listRoot.appendChild(li);
    }

    function getUrlParams() {
        const url = location.search.slice(1);
        const result = {};
        url.split("&").forEach((part) => {
            const item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

}