'use strict';

class ReloadableListView {
    constructor(listRootID, pageSize, getItemsFn, getListCellFn, filterFn) {
        this.listRoot = document.getElementById(listRootID);
        this._renderSearchInput();
        this._renderQuickFilters();
        this._renderListTarget();
        this._renderPaginationButtons();

        this._getItemsFn = getItemsFn;
        this._getListCellFn = getListCellFn;
        this._filterFn = filterFn;

        this._currentSearchTerm = '';
        this._itemList = [];
        this._filteredItemList = [];
        this._currentStartIndex = 0;
        this._currentListElement = null;
        this._pageSize = pageSize;
        this._quickFilters = {
            saved: false,
            unread: false,
            read: false,
            annotated: false
        }
    }

    async _loadList() {
        this._itemList = await this._getItemsFn();
        this._filteredItemList = this._itemList;
    }

    _renderList(runFilters = false) {
        if (runFilters)
            this._runFilters();

        this._managePaginationButtonState();
        if (this._currentListElement)
            this.listTarget.removeChild(this._currentListElement);

        let newList = document.createElement('ul');
        if (this._filteredItemList.length > 0 && this._filteredItemList[0].id) {
            const elsToRender = this._filteredItemList.slice(this._currentStartIndex, this._currentStartIndex + this._pageSize);
            for (let el of elsToRender) {
                const li = this._getListCellFn(el, this._renderList.bind(this));
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

    async render(runFilters = false) {
        if (this._filteredItemList.length === 0)
            await this._loadList();

        this._renderList(runFilters);
    }

    _renderPaginationButtons() {
        this._pageRightButton = button('>', () => {
            if (this._currentStartIndex < (this._filteredItemList.length - (this._pageSize - 1)))
                this._currentStartIndex += this._pageSize;

            this._renderList();
        });

        this._pageLeftButton = button('<', () => {
            if (this._currentStartIndex !== 0)
                this._currentStartIndex -= this._pageSize;

            this._renderList();
        });

        this._toStartButton = button('<<', () => {
            this._resetPageIndex();
            this._renderList();
        });

        this._toEndButton = button('>>', () => {
            this._currentStartIndex = this._pageSize * (Math.floor(this._filteredItemList.length / this._pageSize));
            this._renderList();
        });

        this._managePaginationButtonState();

        const lbg = document.createElement('div');
        lbg.id = 'trailing-button-group';
        lbg.appendChild(this._toStartButton);
        lbg.appendChild(this._pageLeftButton);
        lbg.appendChild(this._pageRightButton);
        lbg.appendChild(this._toEndButton);
        this.listRoot.appendChild(lbg);
    }

    _enable(...buttons) {
        for (let button of buttons)
            button.removeAttribute('disabled');
    }

    _managePaginationButtonState() {
        const MAX_INDEX = this._pageSize * (Math.floor((this._filteredItemList?.length || 0) / this._pageSize));
        this._enable(this._pageLeftButton, this._pageRightButton, this._toStartButton, this._toEndButton);
        if (this._currentStartIndex === 0) {
            this._pageLeftButton.setAttribute('disabled', 'disabled');
            this._toStartButton.setAttribute('disabled', 'disabled');
        } else if (this._currentStartIndex === MAX_INDEX) {
            this._pageRightButton.setAttribute('disabled', 'disabled');
            this._toEndButton.setAttribute('disabled', 'disabled');
        }
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
            this._currentSearchTerm = input.value;
            this._resetPageIndex();
            this._renderList(true);
        });
        searchForm.appendChild(label);
        searchForm.appendChild(input);
        this.listRoot.appendChild(searchForm);
    }

    _runFilters() {
        this._filteredItemList = this._itemList;
        this._userFilter();
        this._builtinFilters();
    }

    _userFilter() {
        // nothing to do
        if (!this._currentSearchTerm || this._currentSearchTerm === '')
            return;

        this._filteredItemList = this._filteredItemList.filter(entry => {
            return this._filterFn(entry, this._currentSearchTerm);
        });
    }

    _builtinFilters() {
        if (this._quickFilters.read)
            this._filteredItemList = this._filteredItemList.filter(item => item.read);

        if (this._quickFilters.unread)
            this._filteredItemList = this._filteredItemList.filter(item => !item.read);

        if (this._quickFilters.annotated)
            this._filteredItemList = this._filteredItemList.filter(item => item.hasNote);

        if (this._quickFilters.saved)
            this._filteredItemList = this._filteredItemList.filter(item => item.saved);
    }

    _resetPageIndex() {
        this._currentStartIndex = 0;
    }

    _renderQuickFilters() {
        const div = document.createElement('div');
        div.classList.add('filter-btn-group');
        const clickHandler = (checkbox, filterName) => {
            this._quickFilters[filterName] = checkbox.checked;
            this._resetPageIndex();
            this._renderList(true);
        };
        const unread = checkbox('Unread', (checkbox) => { clickHandler(checkbox, 'unread'); });
        const read = checkbox('Read', (checkbox) => { clickHandler(checkbox, 'read'); });
        const annotated = checkbox('Annotated', (checkbox) => { clickHandler(checkbox, 'annotated'); });
        const saved = checkbox('Saved', (checkbox) => { clickHandler(checkbox, 'saved'); });

        div.appendChild(unread);
        div.appendChild(read);
        div.appendChild(annotated);
        div.appendChild(saved);
        this.listRoot.appendChild(div);
    }
}