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

    style() {
        return css`
            :host {
                flex-grow: 1;
                text-align: center;
                max-width: 200px;
                padding: var(--space-medium);
                cursor: pointer;
                background-color: var(--background-color);
                color: var(--background-text-color);
                transition: background-color var(--transition-speed) ease-in-out;
            }

            :host(:hover) {
                background-color: var(--primary-color);
                color: var(--primary-text-color);
            }

            :host([selected]) {
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
            <slot></slot>
        `
    }

    _dispatchNavItemClicked() {
        this.dispatchEvent(new CustomEvent('ziro-nav-item-selected', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-nav-item', ZiroNavItem);
