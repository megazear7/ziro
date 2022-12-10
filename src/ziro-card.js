import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';
import './ziro-splash.js';
import { wait } from './services/time.js';

class ZiroCard extends ZiroComponent {
    readyCallback() {
        this._isAnimating = false;
        this.isFlipOut = this.getAttribute('flip-out') === 'true';
        this.isFlipIn = this.getAttribute('flip-in') === 'true';
        this.dispatchEvent(new CustomEvent('ziro-card-connected', {
            bubbles: true
        }));
        this.container = this.shadowRoot.getElementById('container');
    }

    static get observedAttributes() { return ['isFlipIn', 'isFlipOut']; }

    styles() {
        return [css`
            :host {
                width: 100%;
            }

            #container {
                perspective: var(--zc-perspective);
            }
              
            [part="card"] {
                transform: translate(100vw) rotateY(180deg);
                background-color: var(--zc-background-light-color);
                border-radius: var(--zc-border-radius);
                padding: var(--zc-space-medium);
                text-align: center;
                transition: transform var(--zc-transition-speed-slow);
                transform-style: preserve-3d;
                box-shadow: var(--zc-card-shadow);
            }
              
            #container.flipIn [part="card"] {
                left: 0;
                transform: translate(0) rotateY(0);
            }

            #container.flipOut [part="card"] {
                left: 0;
                transform: translate(-100vw) rotateY(-180deg);
            }
              
            .flip-card-front {
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
        `];
    }

    render() {
        return html`
            <div id="container" part="container" class="${this.isFlipIn ? 'flipIn' : ''} ${this.isFlipOut ? 'flipOut' : ''}">
                <div part="card">
                    <div class="flip-card-front">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'isFlipOut') {
            this.isFlipOut = newValue;
        } else if (name === 'isFlipIn') {
            this.isFlipIn = newValue;
        }
    }

    get isFlipIn() {
        return this._isFlipIn;
    }

    set isFlipIn(val) {
        if (this.container) {
            if (this._isAnimating) {
                return;
            }
    
            this._isAnimating = true;
            this.container.classList.add('isAnimating');
            setTimeout(() => {
                this._isAnimating = false;
                this.container.classList.remove('isAnimating');
            }, 600);
    
            this._isFlipIn = val;
            this._isFlipOut = false;

            if (this._isFlipIn) {
                this.container.classList.remove('flipOut');
                this.container.classList.add('flipIn');
            } else {
                this.container.classList.remove('flipOut');
                this.container.classList.remove('flipIn');
            }
        }
    }

    get isFlipOut() {
        return this._isFlipOut;
    }

    set isFlipOut(val) {
        if (this.container) {
            if (this._isAnimating) {
                return;
            }
    
            this._isAnimating = true;
            this.container.classList.add('isAnimating');
            setTimeout(() => {
                this._isAnimating = false;
                this.container.classList.remove('isAnimating');
            }, 600);
    
            this._isFlipOut = val;
            this._isFlipIn = false;

            if (this._isFlipOut) {
                this.container.classList.remove('flipIn');
                this.container.classList.add('flipOut');
            } else {
                this.container.classList.remove('flipIn');
                this.container.classList.remove('flipOut');
            }
        }
    }

    async reset() {
        if (this._isAnimating) {
            return;
        }

        this._isAnimating = true;
        setTimeout(() => this._isAnimating = false, 30);

        this.shadowRoot.querySelector('[part="card"]').style.transition = 'auto';
        await wait(10);
        this._isFlipOut = false;
        this._isFlipIn = false;
        this.container.classList.remove('flipIn');
        this.container.classList.remove('flipOut');
        await wait(10);
        this.shadowRoot.querySelector('[part="card"]').style = '';
    }

    async flipOut() {
        this.isFlipOut = true;
    }

    async flipIn() {
        this.isFlipIn = true;
    }

    proceed() {
        if (this.isFlipOut) {
            this.reset();
        } else if (this.isFlipIn) {
            this.flipOut();
        } else {
            this.flipIn();
        }
    }
}

window.customElements.define('ziro-card', ZiroCard);
