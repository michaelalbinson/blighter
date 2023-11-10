window.onload = async () => {
    'use strict';

    const urlParams = getUrlParams();
    let item;
    if (urlParams?.id)
        item = await fetch(`/presets?id=${urlParams.id}`);

    if (!item.ok)
        return console.error(':(');

    // there may or may not already be notes
    const preset = await item.json();
    const presetTextInput = document.getElementById('presetText');
    presetTextInput.value = preset.presetText;
    const presetNameInput = document.getElementById('presetName');
    presetNameInput.value = preset.presetName;
    const presetIdInput = document.getElementById('id');
    presetIdInput.value = preset.id;

    window.top.__item = preset;
};