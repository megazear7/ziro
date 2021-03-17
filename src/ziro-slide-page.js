import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';

class ZiroSlidePage extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.render();

        this.dispatchEvent(new CustomEvent('ziro-slide-page-connected', {
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
            if (this.active) {
                this._dispatchOpened();
            } else {
                this._dispatchClosed();
            }
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

    get speed() {
        if (this.attributes.speed && this.attributes.speed.value !== undefined) {
            return this.attributes.speed.value;
        } else {
            return 300;
        }
    }

    set speed(val) {
        if (val) {
            this.setAttribute('speed', '');
        } else {
            this.removeAttribute('speed');
        }
    }

    open() {
        this.active = true;
    }

    close() {
        this.active = false;
    }

    toggle() {
        this.active = !this.active;
    }

    style() {
        return css`
            :host {
                display: block;
                position: absolute;
                top: 0;
                left: -100%;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: 20px;
                width: 100%;
                height: 100%;
                background-color: white;
                transition: left ${this.speed}ms ease-in-out;
            }

            :host([active]) {
                left: 0%;
            }

            button {
                width: 100%;
                text-align: left;
            }

            button:before {
                content: "\\2190 ";
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = html`
            ${this.style()}
            ${buttonStyles}
            ${this.active ? html`
                <div class="container">
                    <button> Back</button>
                    <slot></slot>
                </div>
            ` : ''}
        `;

        this._addEventListeners();
    }

    _addEventListeners() {
        const button = this.shadowRoot.querySelector('button');
        
        if (button) {
            button.addEventListener('click', () => this.close());
        }
    }

    _dispatchOpened() {
        this.dispatchEvent(new CustomEvent('ziro-slide-page-opened', {
            bubbles: true
        }));
    }

    _dispatchClosed() {
        this.dispatchEvent(new CustomEvent('ziro-slide-page-closed', {
            bubbles: true
        }));
    }
}

window.customElements.define('ziro-slide-page', ZiroSlidePage);
