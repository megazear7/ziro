import html from './services/html.js';
import css from './services/css.js';

class ZiroPanel extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();
    }

    style() {
        return css`
            :host {
                display: block;
                position: absolute;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: 20px;
                width: 100%;
                height: 100%;
                transition: left 300ms ease-in-out;
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

window.customElements.define('ziro-panel', ZiroPanel);
