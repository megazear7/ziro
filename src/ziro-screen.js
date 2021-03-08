import html from './services/html.js';
import css from './services/css.js';

class ZiroScreen extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();

        this.addEventListener('ziro-nav-click', e => this.slideTo(e.detail.panelSelected));
    }

    style() {
        return css`
            :host {
                display: block;
                box-sizing: border-box;
            }
        `;
    }

    render() {
        return html`
            ${this.style()}
            <slot></slot>
        `
    }

    slideTo(index) {
        this.querySelector('ziro-panel-set').slideTo(index);
    }
}

window.customElements.define('ziro-screen', ZiroScreen);
