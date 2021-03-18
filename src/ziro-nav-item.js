import html from './services/html.js';
import css from './services/css.js';
import theme from './styles/theme.js';

class ZiroNavItem extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();

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
        if (this.selected) {
            button.tabIndex = '-1';
        } else {
            button.tabIndex = '0';
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

    style() {
        return css`
            :host {
                display: block;
                flex-grow: 1;
                max-width: 200px;
            }

            button {
                text-align: center;
                width: 100%;
                padding: var(--space-medium);
                cursor: pointer;
                background-color: var(--background-color);
                color: var(--background-text-color);
                transition: background-color var(--transition-speed) ease-in-out;
                background: none;
                border: none;
                outline: none;
            }

            button:hover, button:focus {
                outline: none;
                background-color: var(--primary-color);
                color: var(--primary-text-color);
            }

            :host([selected]) button {
                background-color: var(--selected-color);
                color: var(--selected-text-color);
                cursor: auto;
            }
        `;
    }

    render() {
        return html`
            ${theme}
            ${this.style()}
            <button tabindex="${this.selected ? '-1' : '0'}">
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
