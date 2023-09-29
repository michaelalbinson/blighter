window.onload = async () => {
    'use strict';

    const getData = async () => {
        const urlParams = getUrlParams();
        let url = '/feed';
        if (window.location.href.includes('single-feed'))
            url = `/feed?id=${urlParams.id}`;
        else if (window.location.href.includes('/saved'))
            url = '/feed?saved=true';
        else if (window.location.href.includes('/unread'))
            url = '/feed?unread=true';
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

    const buildListItem = (item, reloadList) => {
        const link = createElement('a', {
            href: item.link,
            target: '_blank',
            innerText: item.title
        });
        const span = getSpan(new Date(item.pubDate).toString() + " - ");
        const a2 = createElement('a', {
            innerText: item.feed ? item.feed.name : item.domain,
            href: item.feed ? `/single-feed?id=${item.feed.id}` : item.link
        });
        span.appendChild(a2);

        const span2 = getSpan('');
        span2.classList.add('links');
        const saveButton = button(item.saved ? 'Unsave' : 'Save', async () => {
            const res = await fetch('/item/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: fullItemId(item), saved: !item.saved })
            });

            if (!res.ok) {
                console.error('Failed to save item');
                return;
            }

            item.saved = !item.saved;
            saveButton.innerText = item.saved ? 'Unsave' : 'Save';
            reloadList(true);
            if (window.location.href.includes('/saved'))
                window.location.reload();
        });
        span2.appendChild(saveButton);
        span2.appendChild(getSpan(' - '));

        const readButton = document.createElement('button');
        readButton.innerText = item.read ? 'Mark unread' : 'Mark read';
        const markRead = async (item, isRead) => {
            const res = await fetch('/item/mark-read', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: fullItemId(item), read: isRead })
            });

            if (!res.ok) {
                console.error('Failed to mark item read');
                return;
            }

            item.read = isRead;
            readButton.innerText = isRead ? 'Mark unread' : 'Mark read';
            reloadList(true);
            if (window.location.href.includes('/unread'))
                window.location.reload();
        };

        readButton.addEventListener('click', () => {
            markRead(item, !item.read);
        });

        link.addEventListener('click', async () => {
            await markRead(item, true);
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