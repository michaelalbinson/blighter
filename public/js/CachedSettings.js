'use strict';

const defaultClientSettings = {
    pageSize: 20
}

class CachedSettings {
    CACHE_KEY = 'clientSettings';

    _load() {
        if (this._settings)
            return this._settings;

        let settingsStr = localStorage.getItem(this.CACHE_KEY);
        if (!settingsStr)
            settingsStr = JSON.stringify(defaultClientSettings);

        this._settings = JSON.parse(settingsStr);
        return this._settings;
    }

    _flush() {
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(defaultClientSettings));
        this._settings = defaultClientSettings;
    }

    _save() {
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(this._settings));
    }

    get(setting) {
        const settings = this._load();
        return settings[setting];
    }

    getAll() {
        return this._load();
    }

    set(setting, value) {
        const settings = this._load();
        settings[setting] = value;
        this._save();
    }
}

window.blighterClientSettings = new CachedSettings();