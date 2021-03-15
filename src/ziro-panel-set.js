import html from './services/html.js';
import css from './services/css.js';

class ZiroPanelSet extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.index = 0;
        this.render();
    }

    speed() {
        return this.attributes.speed && this.attributes.speed.value || 300;
    }

    styles() {
        return css`
            :host {
                box-sizing: border-box;
                height: 100%;
                width: 100%;
                overflow-x: hidden;
                --panel-index: 0;
            }

            ::slotted(ziro-panel) {
                transition: left ${this.speed()}ms ease-in-out;
            }

            ::slotted(ziro-panel:nth-of-type(1)) {
                left: calc(-1 * var(--panel-index) * 100% + 0%);
            }

            ::slotted(ziro-panel:nth-of-type(2)) {
                left: calc(-1 * var(--panel-index) * 100% + 100%);
            }

            ::slotted(ziro-panel:nth-of-type(3)) {
                left: calc(-1 * var(--panel-index) * 100% + 200%);
            }

            ::slotted(ziro-panel:nth-of-type(4)) {
                left: calc(-1 * var(--panel-index) * 100% + 300%);
            }

            ::slotted(ziro-panel:nth-of-type(5)) {
                left: calc(-1 * var(--panel-index) * 100% + 400%);
            }

            ::slotted(ziro-panel:nth-of-type(6)) {
                left: calc(-1 * var(--panel-index) * 100% + 500%);
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = html`
            ${this.styles()}
            <slot></slot>
        `
    }

    slideTo(index) {
        const oldIndex = this.index || 0;
        const panels = this.querySelectorAll('ziro-panel');
        
        if (index > panels.length-1) {
            this.index = panels.length-1;
        } else if (index < 0) {
            this.index = 0;
        } else {
            this.index = index;
        }

        panels[index].active = true;
        this.style.setProperty('--panel-index', this.index);
        if (oldIndex !== this.index) {
            setTimeout(() => {
                panels[oldIndex].active = false;
            }, this.speed());
        }
    }
}

window.customElements.define('ziro-panel-set', ZiroPanelSet);
