import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import ZiroComponent from './ziro-component.js';

class ZiroCloser extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-closer-connected', {
            bubbles: true
        }));

        this.shadowRoot.querySelector('button').addEventListener('click', () => this._dispatchClosed(), { signal: this.signal });
    }

    styles() {
        return [buttonStyles, css`
            button {
                position: relative;
                width: 100%;
                text-align: left;
            }
        `];
    }

    render() {
        return html`
            <button part="button"><slot></slot><ziro-splash></ziro-splash></button>
        `;
    }

    _dispatchClosed() {
        this.dispatchEvent(new CustomEvent('ziro-closed', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-closer', ZiroCloser);
