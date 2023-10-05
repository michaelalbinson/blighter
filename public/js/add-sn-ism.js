'use strict';

window.addEventListener('load',  async () => {
	const addButton = document.getElementById('add-another');
	addButton.addEventListener('click', () => {
		addDefTarget();
	});

	// TODO: do a real data source
	const urlParams = getUrlParams();
	let existingAbbr;
	if (urlParams.abbr) {
		existingAbbr = window.top.snisms.filter(item => item.abbr === urlParams.abbr).pop();
		document.getElementById('abbr').value = existingAbbr.abbr;
	}

	const defTarget = document.getElementById('def-target');
	const currentDefs = {};
	function addDefTarget(text=null) {
		const defIdx = Object.keys(currentDefs).length;
		const inputId = `def_${defIdx}`;
		const wrap = document.createElement('div');
		const label = createElement('label', {
			for: inputId,
			innerText: 'Definition'
		});
		const input = createElement('textarea', {
			id: inputId,
			name: inputId,
			required: true,
			style: 'width: 95vw; height: 5rem; resize: none;',
			value: text ? text : undefined
		});

		wrap.appendChild(label);
		if (defIdx !== 0) {
			const removeBtn = button('-', () => {
				wrap.remove();
			});
			wrap.appendChild(removeBtn);
			delete currentDefs[inputId];
		}
		wrap.appendChild(htmlBR());
		wrap.appendChild(input);
		defTarget.appendChild(wrap);
		currentDefs[inputId] = wrap;
	}

	if (existingAbbr) {
		if (existingAbbr.def instanceof Array) {
			for (let def of existingAbbr.def)
				addDefTarget(def);
		} else
			addDefTarget(existingAbbr.def);
	} else
		addDefTarget();
});