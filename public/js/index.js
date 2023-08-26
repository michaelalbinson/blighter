window.onload = async () => {
    'use strict';

    const getData = async () => {
        const urlParams = getUrlParams();
        let url = '/feed';
        if (window.location.href.includes('single-feed'))
            url = `/feed?id=${urlParams.id}`;
        else if (window.location.href.includes('/saved'))
            url = '/feed?saved=true';
        else if (window.location.href.includes('/reading-list'))
            url = '/reading-list-feed';
        else if (window.location.href.includes('/annotated'))
            url = '/feed?annotated=true';

        const data = await fetch(url);
        if (!data.ok)
            throw new Error('Failed to load feed data');

        const allItems = await data.json();
        window.__allItems = allItems;
        return allItems;
    }

    const fullItemId = (item) => {
        if (item.feed)
            return `feed_item-${item.id}`;
        else
            return `reading_list_item-${item.id}`;
    }

    const getNoteURL = (item) => {
        return `/item-note?itemId=${fullItemId(item)}`;
    }

    const buildListItem = (item) => {
        const link = document.createElement('a');
        link.href = item.link;
        link.target = '_blank';
        link.innerText = item.title;
        const span = document.createElement('span');
        span.innerText = new Date(item.pubDate).toString() + " - ";
        const a2 = document.createElement('a');
        if (item.feed) {
            a2.innerText = item.feed.name;
            a2.href = `/single-feed?id=${item.feed.id}`;
        } else {
            a2.innerText = item.domain;
            a2.href = item.link;
        }
        span.appendChild(a2);
        const span2 = document.createElement('span');
        span2.innerText = item.categories;
        const span3 = document.createElement('span');
        span3.classList.add('links');
        const saveButton = button(item.saved ? 'Unsave' : 'Save', async () => {
            const res = await fetch('/save-item', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: fullItemId(item), saved: item.saved })
            });

            if (!res.ok) {
                console.error('Failed to save item');
                return;
            }

            saveButton.innerText = item.saved ? 'Save' : 'Unsave';
            item.saved = !item.saved;
            if (window.location.href.includes('/saved'))
                window.location.reload();
        });
        span3.appendChild(saveButton);
        const span4 = document.createElement('span');
        span4.innerText = ' - ';
        span3.appendChild(span4);

        const noteButton = addLink(item.hasNote ? 'View/Edit Note' : 'Add Note', getNoteURL(item));
        span3.appendChild(noteButton);
        const li = document.createElement('li');
        li.appendChild(link);
        li.appendChild(document.createElement('br'));
        li.appendChild(span);
        li.appendChild(document.createElement('br'));
        li.appendChild(span2);
        li.appendChild(document.createElement('br'));
        li.appendChild(span3);
        return li;
    };

    const filterFn = (item, searchTerm) => {
        return (item.title + ' ' + item.categories + ' ' + (item?.feed?.name || item.domain)).toLowerCase().includes(searchTerm.toLowerCase());
    }

    const PAGE_SIZE = window.blighterClientSettings.get('pageSize');
    const rlv = new ReloadableListView('list', PAGE_SIZE, getData, buildListItem, filterFn);
    await rlv.render();
}