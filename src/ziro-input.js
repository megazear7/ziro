import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroInput extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-selector-connected', {
            bubbles: true
        }));

        const inputElement = this.inputElement;
        if (inputElement) {
            inputElement.addEventListener('input', () => {
                this.value = inputElement.value;
                this.dispatchEvent(new CustomEvent('ziro-selector-input', {
                    bubbles: true
                }));
            });

            inputElement.addEventListener('change', () => {
                this.value = inputElement.value;
                this.dispatchEvent(new CustomEvent('ziro-selector-change', {
                    bubbles: true
                }));
            });
        }
    }

    static get props() {
        return [ 'placeholder', 'value', 'hint' ];
    }

    styles() {
        return [css`
            :host {
                display: block;
                text-align: center;
            }

            input {
                width: 100%;
                padding: var(--zc-space-small) 0;
                border: none;
                font-size: var(--zc-font-size-medium);
                background-color: transparent;
                color: var(--zc-background-text-color);
                text-align: center;
            }

            input:focus {
                outline: none;
            }

            input ~ hr {
                margin: 0;
            }

            input ~ hr.off {
                border: 1px solid var(--zc-selected-color);
                border-width: 0 0 1px 0;
            }

            input ~ hr.on {
                position: relative;
                top: -1px;
                width: 0;
                margin: auto;
                border: 1px solid var(--zc-selected-color);
                border-width: 0 0 1px 0;
                transition: width var(--zc-transition-speed), border var(--zc-transition-speed);
            }

            input:focus ~ hr.on {
                width: 100%;
                border: 1px solid var(--zc-primary-color);
                border-width: 0 0 1px 0;
            }

            .placeholder {
                margin: auto;
                text-align: center;
                font-size: var(--zc-font-size-small);
                color: var(--zc-background-mild-color);
                width: 0;
                transition: width 1s;
                overflow: hidden; 
                text-overflow: clip;
                white-space: nowrap;
            }

            .placeholder.show {
                width: 100%;
            }
        `];
    }

    render() {
        return html`
            <input type="text" placeholder="${this.placeholder}" value="${this.value}">
            <hr class="off">
            <hr class="on">
            <div class="placeholder">${this.hint}</div>
        `;
    }

    propUpdated(attr) {
        const inputElement = this.inputElement;
        const placeholderElement = this.placeholderElement;
        if (attr === 'placeholder') {
            inputElement.placeholder = this.placeholder;
        } else if (attr === 'hint') {
            placeholderElement.innerText = this.hint
        } else if (attr === 'value') {
            inputElement.value = this.value;
            placeholderElement.classList.toggle('show', this.value.length > 0);
        }
    }

    get inputElement() {
        if (this.shadowRoot) {
            return this.shadowRoot.querySelector('input');
        } else {
            return undefined;
        }
    }

    get placeholderElement() {
        if (this.shadowRoot) {
            return this.shadowRoot.querySelector('.placeholder');
        } else {
            return undefined;
        }
    }
}

window.customElements.define('ziro-input', ZiroInput);
