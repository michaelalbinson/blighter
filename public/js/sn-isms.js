window.onload = async () => {
	'use strict';

	const getData = async () => {
		return window.top.snisms;
	}

	const buildListItem = item => {
		const abbr = document.createElement('strong');
		abbr.innerText = item.abbr + ' ';
		abbr.id = item.abbr;
		const def = document.createElement('p');
		def.innerHTML = item.def instanceof Array ? item.def.join('<br/><br/>') : item.def;

		const li = document.createElement('li');
		li.appendChild(abbr);
		li.appendChild(def);
		return li;
	};

	const filterFn = (item, searchTerm) => {
		if (!item.__searchDefCache)
			item.__searchCache = item.def instanceof Array ? item.def.join(' ') : item.def;

		return (item.abbr + ' ' + item.__searchDefCache).toLowerCase().includes(searchTerm.toLowerCase());
	}

	const rlv = new ReloadableListView('list', 10000000, getData, buildListItem, filterFn);
	await rlv.render();
}