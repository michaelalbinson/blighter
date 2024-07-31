window.onload = async () => {
	'use strict';

	const getData = async () => {
		let item = await fetch(`/activity-items`);
		if (!item.ok)
			return console.error(':(');

		return await item.json();
	}

	const filterFn = (item, searchTerm) => {
		if (!item.__filterCache)
			item.__filterCache = (item.description + ' ' + new Date(item.updated).toLocaleString()).toLowerCase();;

		return item.__filterCache.includes(searchTerm.toLowerCase());
	}

	const rlv = new ReloadableListView('list', 10000000, getData, getActivityItemListItem, filterFn, {
		renderQuickFilters: false
	});
	await rlv.render();
};