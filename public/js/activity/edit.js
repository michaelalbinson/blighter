window.onload = async () => {
	'use strict';

	const id = new URLSearchParams(window.location.search).get('id');
	if (!id)
		return console.error('No ID provided');

	const res = await fetch('/activity-item?id=' + id);
	if (!res.ok)
		return console.error('Failed to get item');

	const item = await res.json();
	document.querySelector('#description').value = item.description;
	document.querySelector('#priority').value = item.priority;
	document.querySelector('#id').value = item.id;

	document.querySelector('#delete').addEventListener('click', () => {
		deleteItem(item);
	});

	window.top.__item = item;
}