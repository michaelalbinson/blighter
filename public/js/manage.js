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

        const link = addLink(feed.name, `/single-feed?id=${feed.id}`);
        label.appendChild(link);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = feed.active;
        input.checked = feed.active === 1;
        input.name = `feed_${feed.id}`;

        const lastUpdatedSpan = getSpan(`Last updated: ${feed.lastBuildDate}`);
        const updateNowButton = button('Update Now', async () => {
            const res = await fetch(`/feed?id=${feed.id}`, {method: 'POST'});
            if (!res.ok)
                return console.error('Failed to update feed');

            window.location.href = `/single-feed?id=${feed.id}`;
        });
        updateNowButton.type = 'button';

        const li = document.createElement('li');
        li.appendChild(label);
        li.appendChild(input);
        li.appendChild(lastUpdatedSpan);
        li.appendChild(updateNowButton)
        listRoot.appendChild(li);
    }
}