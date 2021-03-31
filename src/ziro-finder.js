import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';
import './ziro-input.js';

class ZiroFinder extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-finder-connected', {
            bubbles: true
        }));
    }

    static get props() {
        return [ 'placeholder', 'query', 'hint' ];
    }

    styles() {
        return [css`
        `];
    }

    render() {
        return html`
            <ziro-input
                placeholder="${this.placeholder}"
                hint="${this.hint}"
                value="${this.query}">
            </ziro-input>
            <slot>
        `;
    }

    get value() {
        // TODO search light dom for selected values.
    }
}

window.customElements.define('ziro-finder', ZiroFinder);
