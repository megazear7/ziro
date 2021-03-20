import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import ZiroComponent from './ziro-component.js';

class ZiroWizardNav extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-wizard-nav-connected', {
            bubbles: true
        }));

        this.shadowRoot.querySelector('button[part="previous"]').addEventListener('click', () => this._dispatchPrevious());
        this.shadowRoot.querySelector('button[part="next"]').addEventListener('click', () => this._dispatchNext());
    }

    styles() {
        return [buttonStyles, css`
            :host {
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                overflow-x: hidden;
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
                transition: left ${this.speed}ms ease-in-out;
            }

            button {
                width: 50%;
                max-width: 300px;
            }

            button[part="previous"] {
                text-align: left;
                margin-right: var(--zc-space-small);
            }

            button[part="next"] {
                text-align: right;
                margin-left: var(--zc-space-small);
            }
        `];
    }

    render() {
        return html`
            <button part="previous"><slot name="previous"></slot></button>
            <button part="next"><slot name="next"></slot></button>
        `;
    }

    _dispatchPrevious() {
        this.dispatchEvent(new CustomEvent('ziro-wizard-previous', {
            bubbles: true
        }));
    }

    _dispatchNext() {
        this.dispatchEvent(new CustomEvent('ziro-wizard-next', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-wizard-nav', ZiroWizardNav);
