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

		const sp = getSpan('');
		const link = document.createElement('a');
		link.href = `/add-sn-ism.html?abbr=${item.abbr}`;
		link.innerText = 'Edit';
		sp.appendChild(link);

		const li = document.createElement('li');
		li.appendChild(abbr);
		li.appendChild(def);
		li.appendChild(sp);
		return li;
	};

	const filterFn = (item, searchTerm) => {
		if (!item.__searchDefCache)
			item.__searchDefCache = item.def instanceof Array ? item.def.join(' ') : item.def;

		return (item.abbr + ' ' + item.__searchDefCache).toLowerCase().includes(searchTerm.toLowerCase());
	}

	const rlv = new ReloadableListView('list', 10000000, getData, buildListItem, filterFn);
	await rlv.render();
}