import html from './services/html.js';
import css from './services/css.js';
import theme from './styles/theme.js';

class ZiroPanel extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.render();

        this.dispatchEvent(new CustomEvent('ziro-panel-connected', {
            bubbles: true
        }));
    }

    get active() {
        return this.attributes.active && this.attributes.active.value !== undefined || false;
    }

    set active(val) {
        const oldVal = this.active;

        if (val) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }

        if (!!oldVal !== !!val) {
            this._dispatchPanelChanged();
        }

        if (this.shadowRoot) {
            this.render();
        }
    }

    get path() {
        if (this.attributes.path && this.attributes.path.value !== undefined) {
            return this.attributes.path.value;
        } else {
            return undefined;
        }
    }

    set path(val) {
        if (val) {
            this.setAttribute('path', '');
        } else {
            this.removeAttribute('path');
        }
    }

    style() {
        return css`
            :host {
                display: block;
                position: absolute;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: var(--space-medium);
                width: 100%;
                height: 100%;
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = html`
            ${theme}
            ${this.style()}
            ${this.active ? html`<slot></slot>` : ''}
        `
    }

    _dispatchPanelChanged() {
        this.dispatchEvent(new CustomEvent('ziro-panel-changed', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-panel', ZiroPanel);
