import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import theme from './styles/theme.js';
import { pathMatches } from './services/path.js';

class ZiroSlidePage extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.render();

        this.dispatchEvent(new CustomEvent('ziro-slide-page-connected', {
            bubbles: true
        }));

        window.addEventListener('popstate', event => {
            if (this.path) {
                this.active = pathMatches(this.path);
            }
        });

        if (this.path) {
            this.active = pathMatches(this.path);
        }

        if (this.history) {
            window.addEventListener('popstate', event => {
                this.active = false;
            });
        }
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
                if (this.history) {
                    history.pushState({ }, document.title || '', this.path);
                }
            } else {
                this._dispatchClosed();
                if (this.history) {
                    window.history.back();
                }
            }
        }

        const container = this._container();
        if (container) {
            container.classList.toggle('active', this.active);
        }

        const slotContainer = this._slotContainer();
        if (slotContainer) {
            if (this.active && ! this._contentLoaded()) {
                slotContainer.innerHTML = this._slot();
            } else if (!this.active && this._contentLoaded()) {
                setTimeout(() => {
                    slotContainer.innerHTML = '';
                }, this.speed);
            }
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

    get history() {
        return this.attributes.history && this.attributes.history.value !== undefined;
    }

    set history(val) {
        if (val) {
            this.setAttribute('history', '');
        } else {
            this.removeAttribute('history');
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
            .container {
                display: block;
                position: absolute;
                top: 0;
                left: -100%;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: var(--space-medium);
                width: 100%;
                height: 100%;
                background-color: var(--background-color);
                color: var(--background-text-color);
                transition: left ${this.speed}ms ease-in-out;
            }

            .container.active {
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
            ${theme}
            ${buttonStyles}
            ${this.style()}
            <div part="outer" class="container">
                <div part="inner">
                    <button> Back</button>
                    <div class="slot-container">
                        ${this.active ? html`${this._slot()}` : ''}
                    </div>
                </div>
            </div>
        `;

        this._addEventListeners();
    }

    _contentLoaded() {
        return this.shadowRoot && this.shadowRoot.querySelector('slot')
    }

    _slot() {
        return html`
            <slot></slot>
        `;
    }

    _slotContainer() {
        return this.shadowRoot && this.shadowRoot.querySelector('.slot-container');
    }

    _container() {
        return this.shadowRoot && this.shadowRoot.querySelector('.container');
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
