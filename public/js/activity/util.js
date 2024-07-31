'use strict';

function getActivityItemListItem(item) {
	const priority = getSpan(item.priority);
	priority.classList.add('activity-item-priority');
	priority.classList.add('activity-item-priority-' + item.priority);

	const link = getSpan(item.description);
	link.classList.add('activity-item-desc');
	const span = getDateSpan(item);

	const span2 = getSpan('');
	span2.classList.add('links');
	const completeBtn = button(item.completed ? 'Un-complete' : 'Complete', async () => {
		await execFetch('/activity-item/complete', item);
	});
	span2.appendChild(completeBtn);

	if (!item.completed) {
		span2.appendChild(getSpan(' - '));
		const deferButton = button(item.deferred ? 'Un-defer' : 'Defer', async () => {
			await execFetch('/activity-item/defer', item);
		});
		span2.appendChild(deferButton);
		span2.appendChild(getSpan(' - '));

		const deleteButton = button('Edit', async () => {
			window.location.href = '/activity-tracker/edit.html?id=' + item.id;
		});
		span2.appendChild(deleteButton);
	}

	const li = createElement('li');
	li.appendChild(priority);
	li.appendChild(link);
	li.appendChild(createElement('br'));
	li.appendChild(span);
	li.appendChild(createElement('br'));
	li.appendChild(span2);
	return li;
}

async function execFetch(url, item) {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ item })
	});

	if (!res.ok) {
		console.error('Failed to update item');
		return;
	}

	window.location.reload();
}

async function deleteItem(item) {
	const res = await fetch('/activity-item', {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ item })
	});

	if (!res.ok) {
		console.error('Failed to delete item');
		return;
	}

	window.location.href = '/activity-tracker/';
}

function getDateSpan(item) {
	if (item.completed)
		return getSpan('✅ Completed ' + new Date(item.updated).toLocaleString())
	else
		return getSpan('Last Update ' + new Date(item.updated).toLocaleString())
}