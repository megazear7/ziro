import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import { pathMatches } from './services/path.js';
import ZiroComponent from './ziro-component.js';

class ZiroSlidePage extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-slide-page-connected', {
            bubbles: true
        }));

        this.addEventListener('ziro-closed', e => {
            e.stopPropagation();
            if (this.active) {
                this.active = false;
            }
        }, { signal: this.signal });

        if (this.path) {
            const pathMatched = pathMatches(this.path);

            if (this.active !== pathMatched) {
                this.active = pathMatched;
            }
        }

        if (this.history && this.path) {
            window.addEventListener('popstate', () => {
                const pathMatched = pathMatches(this.path);

                if (this.active !== pathMatched) {
                    this.active = pathMatched;
                }
            }, { signal: this.signal });
        }
    }

    get active() {
        return this.attributes.active && this.attributes.active.value !== undefined || false;
    }

    set active(val) {
        const oldVal = this.active;

        if (val !== oldVal) {
            if (val && !this.hasAttribute('active')) {
                this.setAttribute('active', '');
            } else if (!val && this.hasAttribute('active')) {
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
        if (!this.active) {
            this.active = true;
        }
    }

    close() {
        if (this.active) {
            this.active = false;
        }
    }

    toggle() {
        this.active = !this.active;
    }

    styles() {
        return [buttonStyles, css`
            .container {
                display: block;
                position: absolute;
                z-index: 1;
                top: 0;
                left: -100%;
                box-sizing: border-box;
                overflow-x: hidden;
                padding: var(--zc-space-medium);
                width: 100%;
                height: 100%;
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
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
                content: "\\2190 \\a0 Back";
                font-size: var(--zc-font-size-medium);
                line-height: var(--zc-font-size-medium);
                vertical-align: middle;
            }
        `];
    }

    render() {
        return html`
            <div part="outer" class="container">
                <div part="inner">
                    <div class="slot-container">
                        ${this.active ? html`${this._slot()}` : ''}
                    </div>
                </div>
            </div>
        `;
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
