window.onload = async () => {
    'use strict';

    const urlParams = getUrlParams();
    let item;
    if (urlParams?.itemId?.includes('feed_item'))
        item = await fetch(`/item?itemID=${urlParams.itemId.split('feed_item-')[1]}`);
    else if (urlParams?.itemId?.includes('reading_list_item'))
        item = await fetch(`/reading-list-item?itemID=${urlParams.itemId.split('reading_list_item-')[1]}`);

    if (!item.ok)
        console.error(':(');

    // there may or may not already be notes
    const noteRes = await fetch(`/note?itemId=${urlParams.itemId}`);
    if (noteRes.ok) {
        const existingNotes = await noteRes.json();
        const noteInput = document.getElementById('note');
        noteInput.value = existingNotes.content;
    }

    const respJson = await item.json();
    const noteHeader = document.getElementById('article-info');
    noteHeader.innerHTML = `Notes for: <a href="${respJson.link}" target="_blank">${respJson.title}</a>`;
    document.getElementById('itemId').value = urlParams.itemId;

    const noteInput = document.getElementById('note');
    new LightweightMarkdownTextarea(noteInput).attach();
};