import html from './services/html.js';
import css from './services/css.js';

class ZiroPanelSet extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.index = 0;
        this.shadowRoot.innerHTML = this.render();
    }

    styles() {
        return css`
            :host {
                display: block;
                box-sizing: border-box;
                --panel-index: 0vw;
            }

            ::slotted(ziro-panel:nth-of-type(1)) {
                left: calc(var(--panel-index) + 0vw);
                background: #eee;
            }

            ::slotted(ziro-panel:nth-of-type(2)) {
                left: calc(var(--panel-index) + 100vw);
                background: #ccc;
            }

            ::slotted(ziro-panel:nth-of-type(3)) {
                left: calc(var(--panel-index) + 200vw);
                background: #aaa;
            }
        `;
    }

    render() {
        return html`
            ${this.styles()}
            <slot></slot>
        `
    }

    slideTo(index) {
        const panels = this.querySelectorAll('ziro-panel').length;
        if (index > panels-1) {
            this.index = panels-1;
        } else if (index < 0) {
            this.index = 0;
        } else {
            this.index = index;
        }
        this.style.setProperty('--panel-index', -(this.index * 100) + 'vw');
    }
}

window.customElements.define('ziro-panel-set', ZiroPanelSet);
