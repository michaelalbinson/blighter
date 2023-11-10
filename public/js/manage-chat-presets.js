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
		const li = document.createElement('li');
		li.appendChild(link)
		listRoot.appendChild(li);
	}
}