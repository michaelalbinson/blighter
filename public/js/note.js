window.onload = async () => {
    'use strict';

    const urlParams = getUrlParams();
    let item;
    if (urlParams?.itemId?.includes('feed_item'))
        item = await fetch(`/feed-item?itemID=${urlParams.itemId.split('feed_item-')[1]}`);

    if (!item.ok)
        console.error(':(');

    // there may or may not already be notes
    const noteRes = await fetch(`/note?itemId=${urlParams.itemId}`);
    if (noteRes.ok) {
        const existingNotes = await noteRes.json();
        const noteInput = document.getElementById('note');
        noteInput.innerText = existingNotes.content;
    }

    const respJson = await item.json();
    const noteHeader = document.getElementById('article-info');
    noteHeader.innerText = `Notes for: ${respJson.title}`;
    document.getElementById('itemId').value = urlParams.itemId;
    window.__testItem = respJson;
};