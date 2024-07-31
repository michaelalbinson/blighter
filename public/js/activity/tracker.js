window.onload = async () => {
	'use strict';

	await loadCurrentActivities();
	await loadDeferredActivities();

	const coll = document.getElementsByClassName("collapsible");
	for (let i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("active");
			this.nextElementSibling.style.display = this.nextElementSibling.style.display === "block" ? "none" : 'block';
		});
	}

	async function loadCurrentActivities() {
		await loadItems(`/activity-items/active`, document.querySelector('#current-activities'));
	}

	async function loadDeferredActivities() {
		await loadItems(`/activity-items/deferred`, document.querySelector('#deferred-items'));
	}

	async function loadItems(url, rootEl) {
		let item = await fetch(url);
		if (!item.ok)
			return console.error(':(');

		// there may or may not already be notes
		const items = await item.json();
		rootEl.innerHTML = '';
		const list = createElement('ul');
		items.forEach(item => {
			list.appendChild(getActivityItemListItem(item));
		});
		rootEl.appendChild(list);
	}
};