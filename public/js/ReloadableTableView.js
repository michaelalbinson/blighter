'use strict';

class ReloadableListView {
    constructor(listRootID, pageSize, getItemsFn, getListCellFn, filterFn) {
        this.listRoot = document.getElementById(listRootID);
        this._renderSearchInput();
        this._renderListTarget();
        this._renderPaginationButtons();

        this._getItemsFn = getItemsFn;
        this._getListCellFn = getListCellFn;
        this._filterFn = filterFn;

        this._itemList = [];
        this._filteredItemList = [];
        this._currentStartIndex = 0;
        this._currentListElement = null;
        this._pageSize = pageSize;
    }

    async _loadList() {
        this._itemList = await this._getItemsFn();
        this._filteredItemList = this._itemList;
    }

    _renderList() {
        if (this._currentListElement)
            this.listTarget.removeChild(this._currentListElement);

        let newList = document.createElement('ul');
        if (this._filteredItemList.length > 0 && this._filteredItemList[0].id) {
            const elsToRender = this._filteredItemList.slice(this._currentStartIndex, this._currentStartIndex + this._pageSize);
            for (let el of elsToRender) {
                const li = this._getListCellFn(el);
                newList.appendChild(li);
            }
        } else {
            newList = document.createElement('div');
            newList.id = 'no-results';
            newList.innerText = 'No matches found';
        }

        this.listTarget.appendChild(newList);
        this._currentListElement = newList;
    }

    _renderListTarget() {
        this.listTarget = document.createElement('div');
        this.listRoot.appendChild(this.listTarget);
    }

    async render() {
        if (this._filteredItemList.length === 0)
            await this._loadList();

        this._renderList();
    }

    _renderPaginationButtons() {
        const pageRight = button('>', () => {
            if (this._currentStartIndex < (this._filteredItemList.length - (this._pageSize - 1)))
                this._currentStartIndex += this._pageSize;

            this._renderList();
        });

        const pageLeft = button('<', () => {
            if (this._currentStartIndex !== 0)
                this._currentStartIndex -= this._pageSize;

            this._renderList();
        });

        const toStartButton = button('<<', () => {
            this._currentStartIndex = 0;
            this._renderList();
        });

        const toEndButton = button('>>', () => {
            this._currentStartIndex = this._pageSize * (Math.floor(this._filteredItemList.length / this._pageSize));
            this._renderList();
        });

        const lbg = document.createElement('div');
        lbg.id = 'trailing-button-group';
        lbg.appendChild(toStartButton);
        lbg.appendChild(pageLeft);
        lbg.appendChild(pageRight);
        lbg.appendChild(toEndButton);
        this.listRoot.appendChild(lbg);
    }

    _renderSearchInput() {
        const searchForm = document.createElement('form');
        searchForm.id = 'search-form';
        const label = document.createElement('label');
        label.for = 'search-input';
        label.style = 'display: none';
        label.innerText = 'Search';
        const input = document.createElement('input');
        input.type = 'search';
        input.name = 'search';
        input.id = 'search-input';
        input.placeholder = '🔎 Quick filter...';
        input.addEventListener('keyup', () => {
            const searchTerm = input.value;
            if (!searchTerm || searchTerm === '') {
                this._filteredItemList = this._itemList;
                return this._renderList();
            }

            this._currentStartIndex = 0;
            this._filteredItemList = this._itemList.filter(entry => {
                return this._filterFn(entry, searchTerm);
            });

            this._renderList();
        });
        searchForm.appendChild(label);
        searchForm.appendChild(input);
        this.listRoot.appendChild(searchForm);
    }
}