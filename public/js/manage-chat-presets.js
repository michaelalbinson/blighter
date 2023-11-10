window.onload = async () => {
	'use strict';

	const data = await fetch('/presets');
	if (!data.ok)
		throw new Error('Failed to load feed data');

	const listRoot = document.querySelector('ul');
	const presets = await data.json();
	console.log(presets);
	for (let preset of presets) {
		const link = createElement('a', {
			text: preset.presetName,
			href: `/add-preset?id=${preset.id}`,
			target: ''
		});
		const form = createElement('form', {
			method: 'delete',
			action: '/presets',
			style: 'display: inline-block;'
		});
		const input = createElement('input', {
			type: 'hidden',
			name: 'id',
			value: preset.id
		});
		const btn = createElement('button', {
			text: 'Delete',
			type: 'submit'
		})
		form.appendChild(input);
		form.appendChild(btn);
		form.onsubmit = async evt => {
			evt.preventDefault();
			await fetch(`/presets`, {
				method: 'delete',
				body: JSON.stringify({id: preset.id}),
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
			});
			window.location.reload();
		}

		const li = createElement('li');
		li.appendChild(link)
		li.appendChild(form);
		listRoot.appendChild(li);
	}
}