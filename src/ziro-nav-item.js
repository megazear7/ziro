import html from './services/html.js';
import css from './services/css.js';

class ZiroNavItem extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();

        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('ziro-nav-item-click', {
                bubbles: true
            }));
        });
    }

    style() {
        return css`
            :host {
                flex-grow: 1;
                text-align: center;
                max-width: 200px;
                padding: 20px;
                cursor: pointer;
                background-color: white;
                transition: background-color 300ms ease-in-out;
            }

            :host(:hover) {
                background-color: #bbb;
            }

            :host([selected]) {
                background-color: #ddd;
            }
        `;
    }

    render() {
        return html`
            ${this.style()}
            <slot></slot>
        `
    }
}

window.customElements.define('ziro-nav-item', ZiroNavItem);
