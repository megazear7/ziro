import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';
import './ziro-input.js';

class ZiroFinder extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-finder-connected', {
            bubbles: true
        }));

        this.inputElement(elem => {
            elem.addEventListener('ziro-selector-input', () => {
                this.query = elem.value;
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
        });
    }

    static get props() {
        return [
            'placeholder',
            'query',
            'hint',
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
