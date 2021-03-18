import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroNav extends ZiroComponent {
    readyCallback() {
    }

    styles() {
        return css`
            :host {
                display: flex;
                width: 100%;
                justify-content: center;
                box-sizing: border-box;
                position: absolute;
                bottom: 0;
                border-top: 1px solid var(--zc-selected-color);
                box-shadow: 0 0 20px 0px var(--zc-selected-color);
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
            }
        `;
    }

    render() {
        return html`
            <slot></slot>
        `
    }
}

window.customElements.define('ziro-nav', ZiroNav);
