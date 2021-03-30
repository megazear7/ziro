import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import ZiroComponent from './ziro-component.js';

class ZiroSelector extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-selector-connected', {
            bubbles: true
        }));
    }

    props() {
        return [ 'placeholder' ];
    }

    styles() {
        return [buttonStyles, css`
            :host {
                display: block;
            }

            input {
                width: 100%;
                padding: var(--zc-space-small);
                border-radius: 0;
                border: 1px solid var(--zc-selected-color);
                border-width: 0 0 1px 0;
                transition: border var(--zc-transition-speed);
                font-size: var(--zc-font-size-medium);
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
            }


            input:focus {
                outline: none;
                border: 1px solid var(--zc-primary-color);
                border-width: 0 0 1px 0;
            }
        `];
    }

    render() {
        return html`
            <input type="text" placeholder="${this.placeholder}"></input>
        `;
    }

    updateProp(attr) {
        if (attr === 'placeholder') {
            this.shadowRoot.querySelector('input').placeholder = this.placeholder;
        }
    }
}

window.customElements.define('ziro-selector', ZiroSelector);
