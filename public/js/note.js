window.onload = async () => {
    'use strict';

    const urlParams = getUrlParams();
    let item;
    if (urlParams?.itemId?.includes('feed_item'))
        item = await fetch(`/item?itemID=${urlParams.itemId.split('feed_item-')[1]}`);
    else if (urlParams?.itemId?.includes('reading_list_item'))
        item = await fetch(`/reading-list-item?itemID=${urlParams.itemId.split('reading_list_item-')[1]}`);
    else if (urlParams?.id)
        item = await fetch(`/note?id=${urlParams.id}`);

    if (!item.ok)
        console.error(':(');

    const data = await item.json();
    let note, itemData;
    if (data.note) {
        note = data.note;
        itemData = data.item;
    } else {
        itemData = data;
        const noteRes = await fetch(`/note?itemId=${urlParams.itemId}`);;
        if (!noteRes.ok)
            console.log('No note data found');
        else
            note = await noteRes.json();
    }

    // there may or may not already be notes
    const noteInput = document.getElementById('note');
    if (note)
        noteInput.value = note.content;

    const noteHeader = document.getElementById('article-info');
    noteHeader.innerHTML = `Notes for: <a href="${itemData.link}" target="_blank">${itemData.title}</a>`;
    document.getElementById('itemId').value = urlParams.itemId;

    const readButton = document.getElementById('mark-read');
    readButton.innerText = itemData.read ? 'Mark unread' : 'Mark read';
    readButton.addEventListener('click', async () => {
        itemData.read = !itemData.read;
        const res = await fetch('/item/mark-read', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemId: urlParams.itemId, read: itemData.read })
        });

        if (!res.ok) {
            console.error('Failed to mark item read');
            return;
        }

        readButton.innerText = itemData.read ? 'Mark unread' : 'Mark read';
    });

    new LightweightMarkdownTextarea(noteInput).attach();
    window.top.__item = itemData;
};