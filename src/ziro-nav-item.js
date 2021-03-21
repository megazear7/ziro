import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroNavItem extends ZiroComponent {
    readyCallback() {
        this.addEventListener('click', () => {
            this._dispatchNavItemClicked();
        });

        this.dispatchEvent(new CustomEvent('ziro-nav-item-connected', {
            bubbles: true
        }));
    }

    static get observedAttributes() { return ['selected']; }

    attributeChangedCallback(name, oldValue, newValue) {
        const button = this._button();
        if (button) {
            if (this.selected) {
                button.tabIndex = '-1';
            } else {
                button.tabIndex = '0';
            }
        }
    }

    get selected() {
        return this.hasAttribute('selected');
    }

    set selected(val) {
        const button = this._button();
        if (val) {
            this.setAttribute('selected', '');
            if (button) {
                button.tabIndex = '-1';
            }
        } else {
            this.removeAttribute('selected');
            if (button) {
                button.tabIndex = '0';
            }
        }
    }

    styles() {
        return css`
            :host {
                display: block;
                flex-grow: 1;
                max-width: 200px;
            }

            button {
                text-align: center;
                width: 100%;
                padding: var(--zc-space-medium);
                cursor: pointer;
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
                transition: background-color var(--zc-transition-speed) ease-in-out;
                background: none;
                border: none;
                outline: none;
            }

            button:hover, button:focus {
                outline: none;
                background-color: var(--zc-primary-color);
                color: var(--zc-primary-text-color);
            }

            :host([selected]) button {
                background-color: var(--zc-selected-color);
                color: var(--zc-selected-text-color);
                cursor: auto;
            }
        `;
    }

    render() {
        return html`
            <button part="button" tabindex="${this.selected ? '-1' : '0'}">
                <slot></slot>
            </button>
        `
    }

    _button() {
        return this.shadowRoot && this.shadowRoot.querySelector('button');
    }

    _dispatchNavItemClicked() {
        this.dispatchEvent(new CustomEvent('ziro-nav-item-selected', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-nav-item', ZiroNavItem);
