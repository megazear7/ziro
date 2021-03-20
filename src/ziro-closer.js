import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import ZiroComponent from './ziro-component.js';

class ZiroCloser extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-closer-connected', {
            bubbles: true
        }));

        this.shadowRoot.querySelector('button').addEventListener('click', () => this._dispatchClosed());
    }

    styles() {
        return [buttonStyles, css`
            .container {
                display: block;
                position: absolute;
                top: 0;
                left: -100%;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: var(--zc-space-medium);
                width: 100%;
                height: 100%;
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
                transition: left ${this.speed}ms ease-in-out;
            }

            .container.active {
                left: 0%;
            }

            button {
                width: 100%;
                text-align: left;
            }
        `];
    }

    render() {
        return html`
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
