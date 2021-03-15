import html from './services/html.js';
import css from './services/css.js';

class ZiroPanel extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.render();
    }

    get active() {
        return this.attributes.active && this.attributes.active.value !== undefined || false;
    }

    set active(val) {
        if (val) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }

        if (this.shadowRoot) {
            this.render();
        }
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
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = html`
            ${this.style()}
            ${this.active ? html`<slot></slot>` : ''}
        `
    }
}

window.customElements.define('ziro-panel', ZiroPanel);
