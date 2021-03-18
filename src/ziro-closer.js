import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import theme from './styles/theme.js';
import { pathMatches } from './services/path.js';

class ZiroCloser extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.render();

        this.dispatchEvent(new CustomEvent('ziro-closer-connected', {
            bubbles: true
        }));

        this.shadowRoot.querySelector('button').addEventListener('click', () => this._dispatchClosed());
    }

    style() {
        return css`
            .container {
                display: block;
                position: absolute;
                top: 0;
                left: -100%;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: var(--space-medium);
                width: 100%;
                height: 100%;
                background-color: var(--background-color);
                color: var(--background-text-color);
                transition: left ${this.speed}ms ease-in-out;
            }

            .container.active {
                left: 0%;
            }

            button {
                width: 100%;
                text-align: left;
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = html`
            ${theme}
            ${buttonStyles}
            ${this.style()}
            <button part="button"><slot></slot></button>
        `;
    }

    _dispatchClosed() {
        this.dispatchEvent(new CustomEvent('ziro-closed', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-closer', ZiroCloser);
