window.onload = async () => {
    'use strict';

    const PAGE_SIZE = window.blighterClientSettings.get('pageSize');

    const urlParams = getUrlParams();
    const url = window.location.href.includes('single-feed') ? `/feed?id=${urlParams.id}` : '/feed';
    const data = await fetch(url);
    if (!data.ok)
        throw new Error('Failed to load feed data');

    const listing = await data.json();
    let currentListing = listing;
    let currentStartIndex = 0;
    let currentListElement = null;
    const renderList = () => {
        currentListElement = generateList(currentListing.slice(currentStartIndex, currentStartIndex + PAGE_SIZE), currentListElement);
    }
    renderList();

    const pageRight = button('>', () => {
        if (currentStartIndex < (currentListing.length - (PAGE_SIZE - 1)))
            currentStartIndex += PAGE_SIZE;

        renderList();
    });

    const pageLeft = button('<', () => {
        if (currentStartIndex !== 0)
            currentStartIndex -= PAGE_SIZE;

        renderList();
    });

    const toStartButton = button('<<', () => {
        currentStartIndex = 0;
        renderList();
    });

    const toEndButton = button('>>', () => {
        currentStartIndex = PAGE_SIZE * (Math.floor(currentListing.length / PAGE_SIZE));
        renderList();
    });

    const lbg = document.getElementById('trailing-button-group');
    lbg.appendChild(toStartButton);
    lbg.appendChild(pageLeft);
    lbg.appendChild(pageRight);
    lbg.appendChild(toEndButton);

    const search = document.getElementById('search-input');
    search.addEventListener('keyup', () => {
        const searchTerm = search.value;
        if (!searchTerm || searchTerm === '') {
            currentListing = listing;
            return renderList();
        }

        currentStartIndex = 0;
        currentListing = listing.filter(entry => {
            return (entry.title + ' ' + entry.categories + ' ' + entry.feed.name).toLowerCase().includes(searchTerm.toLowerCase());
        });

        renderList();
    });

    function generateList(listing, currentListElement) {
        const listRoot = document.getElementById('list');
        if (currentListElement)
            listRoot.removeChild(currentListElement);

        const newList = document.createElement('ul');
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
            newList.appendChild(li);
        }

        listRoot.appendChild(newList);
        return newList;
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

    function saveForm() {
        const form = document.createElement('form');
        form.action = '/save';
    }

    function button(text, clickFn) {
        const button = document.createElement('button');
        button.innerText = text;
        button.addEventListener('click', clickFn);
        return button;
    }
}