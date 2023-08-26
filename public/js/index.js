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
        const span = getSpan(new Date(item.pubDate).toString() + " - ");
        const a2 = document.createElement('a');
        if (item.feed) {
            a2.innerText = item.feed.name;
            a2.href = `/single-feed?id=${item.feed.id}`;
        } else {
            a2.innerText = item.domain;
            a2.href = item.link;
        }
        span.appendChild(a2);

        const span2 = getSpan('');
        span2.classList.add('links');
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
        span2.appendChild(saveButton);
        span2.appendChild(getSpan(' - '));
        const readButton = button(item.saved ? 'Mark read' : 'Mark unread', async () => {
            const res = await fetch('/item/mark-read', {
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

            readButton.innerText = item.saved ? 'Mark unread' : 'Mark read';
            item.saved = !item.saved;
            if (window.location.href.includes('/unread'))
                window.location.reload();
        });
        span2.appendChild(readButton);
        span2.appendChild(getSpan(' - '));

        const noteButton = addLink(item.hasNote ? 'View/Edit Note' : 'Add Note', getNoteURL(item));
        span2.appendChild(noteButton);
        const li = document.createElement('li');
        li.appendChild(link);
        li.appendChild(document.createElement('br'));
        li.appendChild(span);
        li.appendChild(document.createElement('br'));
        li.appendChild(getSpan(item.categories || "No categories"));
        li.appendChild(document.createElement('br'));
        li.appendChild(span2);
        return li;
    };

    const filterFn = (item, searchTerm) => {
        return (item.title + ' ' + item.categories + ' ' + (item?.feed?.name || item.domain)).toLowerCase().includes(searchTerm.toLowerCase());
    }

    const PAGE_SIZE = window.blighterClientSettings.get('pageSize');
    const rlv = new ReloadableListView('list', PAGE_SIZE, getData, buildListItem, filterFn);
    await rlv.render();
}