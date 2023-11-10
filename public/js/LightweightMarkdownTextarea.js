'use strict';

class LightweightMarkdownTextarea {
    constructor(element) {
        this._element = element;
    }

    attach() {
        this._element.addEventListener('keydown', this._handleKeyDown.bind(this));
        this._element.addEventListener('keyup', this._handleKeyup.bind(this));
    }

    _handleKeyDown(event) {
        const key = event.key.toLowerCase();
        switch (key) {
            case '[':
                this._matchCharacterWith(']');
                break
            case '(':
                this._matchCharacterWith(')');
                break
            case '*':
                this._matchCharacterWith('*');
                break;
            case '_':
                this._matchCharacterWith('_');
                break;
            case '`':
                this._matchCharacterWith('`');
                break;
        }
    }

    _matchCharacterWith(nextCharacter) {
        const currentIdx = this._element.selectionStart;
        const currentVal = this._element.value;
        const firstSlice = currentVal.slice(0, currentIdx);
        const secondSlice = currentIdx === currentVal.length ? '' : currentVal.slice(-(currentVal.length - currentIdx));

        this._element.value = firstSlice + nextCharacter + secondSlice;

        this._setSelectionBounds(currentIdx);
    }

    _handleKeyup(event) {
        const key = event.key.toLowerCase();
        switch (key) {
            // it's much harder to make this work with keydown because the new character isn't rendered yet, so we'd need
            // to do a lot more manual handling of the selection stuff
            // possible, but I'm feeling lazy today
            case 'enter':
                this._checkToAddListMarkup();
                break;
        }
    }

    _checkToAddListMarkup() {
        const currentIdx = this._element.selectionStart;
        const currentVal = this._element.value;
        const textLines = currentVal.split('\n');
        if (currentIdx === currentVal.length) { // simplest case
            const lastLine = currentVal.split('\n').slice(-2).shift();
            const nextLineListMarkup = this._parseForListMarkup(lastLine);
            this._element.value += nextLineListMarkup;
            this._setSelectionBounds(currentIdx + nextLineListMarkup.length);
        } else {
            let cnt = 0, targetLine = '', idx = 0;
            for (idx in textLines) {
                targetLine = textLines[idx];
                cnt += targetLine.length + 1; // + 1 to account for missing \n character
                if (cnt === currentIdx)
                    break;
            }

            const nextLineListMarkup = this._parseForListMarkup(targetLine)
            if (!nextLineListMarkup)
                return;

            textLines[Number(idx) + 1] = nextLineListMarkup;
            this._element.value = textLines.join('\n');
            this._setSelectionBounds(currentIdx + nextLineListMarkup.length);
        }
    }

    _parseForListMarkup(line) {
        const match = line.match(/^ *- /);
        if (!match)
            return '';

        return match[0];
    }

    _setSelectionBounds(bound) {
        this._element.selectionStart = bound;
        this._element.selectionEnd = bound;
    }
}