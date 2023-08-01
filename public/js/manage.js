window.onload = async () => {
    'use strict';

    const data = await fetch('/feeds');
    if (!data.ok)
        throw new Error('Failed to load feed data');

    const listRoot = document.getElementById('target');
    const feeds = await data.json();
    console.log(feeds);
    for (let feed of feeds) {
        const label = document.createElement('label');
        label.for = `feed_${feed.id}`;
        const link = document.createElement('a');
        link.href = `/single-feed?id=${feed.id}`;
        link.innerText = feed.name;
        label.appendChild(link);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = feed.active;
        input.checked = feed.active === 1;
        input.name = `feed_${feed.id}`;

        const li = document.createElement('li');
        li.appendChild(label);
        li.appendChild(input);
        listRoot.appendChild(li);
    }
}