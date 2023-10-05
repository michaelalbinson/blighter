window.onload = async () => {
	'use strict';

	const getData = async () => {
		const data = await fetch('/notes.db');
		if (!data.ok)
			throw new Error('Failed to load feed data');

		const allItems = await data.json();
		window.__allItems = allItems;
		return allItems;
	}

	const buildListItem = item => {
		const span = getSpan(item.articleTitle);
		const span2 = getSpan('');
		span2.classList.add('links');
		const noteButton = addLink('View Note', `/item-note?id=${item.id}`);
		span2.appendChild(noteButton);
		const li = document.createElement('li');
		li.appendChild(span);
		li.appendChild(document.createElement('br'));
		li.appendChild(span2);
		return li;
	};

	const filterFn = (item, searchTerm) => {
		if (!item.__searchDefCache)
			item.__searchDefCache = item.def instanceof Array ? item.def.join(' ') : item.def;

		return (item.abbr + ' ' + item.__searchDefCache).toLowerCase().includes(searchTerm.toLowerCase());
	}

	const PAGE_SIZE = window.blighterClientSettings.get('pageSize');
	const rlv = new ReloadableListView('list', PAGE_SIZE, getData, buildListItem, filterFn, {
		renderQuickFilters: false
	});
	await rlv.render();
}