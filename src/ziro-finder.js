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

        let connectedItems = 0;
        this.addEventListener('ziro-item-connected', e => {
            e.target.hide();
            connectedItems += 1;

            if (connectedItems === this.querySelectorAll('ziro-item').length) {
                this.updateItems();
            }
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
            { attr: 'value', type: 'json' },
            { attr: 'minQueryLength', default: 0 },
            { attr: 'max', default: 3 },
            { attr: 'multi', type: 'bool' }
        ];
    }

    static get elements() {
        return [ { name: 'inputElement', selector: 'ziro-input' } ];
    }

    styles() {
        return [css`
            :host {
                display:block;
            }

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
            this.querySelectorAll('ziro-item').forEach(item => {
                if (this.multi) {
                    item.selected = this.value.includes(item.value);
                } else {
                    item.selected = deepEqual(this.value, item.value);
                }
            });
        } else if (attr === 'placeholder') {
            this.inputElement(elem => elem.placeholder = this.placeholder);
        } else if (attr === 'hint') {
            this.inputElement(elem => elem.hint = this.hint);
        } else if (attr === 'max') {
            this.updateItems();
        } else if (attr === 'minQueryLength') {
            this.updateItems();
        }
    }

    updateItems() {
        let shownItems = 0;
        this.querySelectorAll('ziro-item').forEach(item => {
            if (this.query.length >= this.minQueryLength && shownItems < this.max) {
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

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

window.customElements.define('ziro-finder', ZiroFinder);
