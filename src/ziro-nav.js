import html from './services/html.js';
import css from './services/css.js';

class ZiroNav extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();
    }

    style() {
        return css`
            :host {
                display: flex;
                width: 100%;
                justify-content: center;
                box-sizing: border-box;
                position: absolute;
                bottom: 0;
                border-top: 1px solid #aaa;
                box-shadow: 0 0 20px 0px #aaa;
                background-color: white;
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

window.customElements.define('ziro-nav', ZiroNav);
