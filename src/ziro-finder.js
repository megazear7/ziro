import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';
import './ziro-input.js';

class ZiroFinder extends ZiroComponent {
    readyCallback() {
        if (this.multi) {
            this.value = this.value || [];
        }

        this.dispatchEvent(new CustomEvent('ziro-finder-connected', {
            bubbles: true
        }));

        this.inputElement(elem => {
            elem.addEventListener('ziro-selector-input', () => {
                this.query = elem.value;

                this.dispatchEvent(new CustomEvent('ziro-finder-input', {
                    bubbles: true,
                    detail: this.query
                }));
            });
        });

        this.addEventListener('ziro-item-connected', e => {
            e.target.hide();
        });

        this.addEventListener('ziro-item-click', e => {
            if (! this.multi) {
                this.querySelectorAll('ziro-item').forEach(item => {
                    if (item !== e.target) {
                        item.selected = false;
                    }
                });
            }

            const clickedItem = e.target;
            if (clickedItem.selected) {
                if (this.multi) {
                    this.value = this.value || [];
                    this.value.push(clickedItem.value);
                } else {
                    this.value = clickedItem.value;
                }
            } else {
                if (this.multi) {
                    this.value = this.value || [];
                    this.value = this.value.filter(val => val !== clickedItem.value);
                } else {
                    this.value = undefined;
                }
            }

            this.dispatchEvent(new CustomEvent('ziro-finder-changed', {
                bubbles: true,
                detail: this.value
            }));
        });
    }

    static get props() {
        return [
            'placeholder',
            'query',
            'hint',
            'value',
            { attr: 'max', default: 3 },
            { attr: 'multi', type: 'bool' }
        ];
    }

    static get elements() {
        return [ { name: 'inputElement', selector: 'ziro-input' } ];
    }

    styles() {
        return [css`
            ::slotted(ziro-item) {
                display: block;
                width: 100%;
            }
        `];
    }

    render() {
        return html`
            <ziro-input
                placeholder="${this.placeholder}"
                hint="${this.hint}"
                value="${this.query}">
            </ziro-input>
            <slot></slot>
        `;
    }

    propUpdated(attr) {
        if (attr === 'query') {
            this.updateItems();
            this.inputElement(elem => elem.value = this.query);
        } else if (attr === 'value') {
            this.querySelectorAll('ziro-item').forEach(item => item.selected = false);
        } else if (attr === 'placeholder') {
            this.inputElement(elem => elem.placeholder = this.placeholder);
        } else if (attr === 'hint') {
            this.inputElement(elem => elem.hint = this.hint);
        } else if (attr === 'max') {
            this.updateItems();
        }
    }

    updateItems() {
        let shownItems = 0;
        this.querySelectorAll('ziro-item').forEach(item => {
            if (this.query.length > 2 && shownItems < this.max) {
                if (item.innerText.toLowerCase().includes(this.query.toLowerCase())) {
                    shownItems += 1;
                    item.show();
                } else {
                    if (!item.selected) {
                        item.hide();
                    }
                }
            } else {
                if (!item.selected) {
                    item.hide();
                }
            }
        });
    }
}

window.customElements.define('ziro-finder', ZiroFinder);
