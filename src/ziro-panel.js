import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroPanel extends ZiroComponent {
    readyCallback() {
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = -1;
        }

        this.dispatchEvent(new CustomEvent('ziro-panel-connected', {
            bubbles: true
        }));
    }

    get active() {
        return this.attributes.active && this.attributes.active.value !== undefined || false;
    }

    set active(val) {
        const oldVal = this.active;
        const container = this._container();

        if (val) {
            this.setAttribute('active', '');

            if (container) {
                container.innerHTML = this._slot();
            }
        } else {
            this.removeAttribute('active');

            if (container) {
                container.innerHTML = '';
            }
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

    styles() {
        return css`
            :host {
                display: block;
                position: absolute;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: var(--zc-space-medium);
                width: 100%;
                height: 100%;
            }
        `;
    }

    render() {
        return html`
            <div id="container">
                ${this.active ? this._slot() : ''}
            </div>
        `
    }

    _container() {
        return this.shadowRoot && this.shadowRoot.getElementById('container');
    }

    _slot() {
        return html`<slot></slot>`;
    }

    _dispatchPanelChanged() {
        this.dispatchEvent(new CustomEvent('ziro-panel-changed', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-panel', ZiroPanel);
