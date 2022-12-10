import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';
import './ziro-splash.js';

class ZiroCard extends ZiroComponent {
    readyCallback() {
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
        this._isFlipIn = val;
        this._isFlipOut = false;

        if (this.container) {
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
        this._isFlipOut = val;
        this._isFlipIn = false;

        if (this.container) {
            if (this._isFlipOut) {
                this.container.classList.remove('flipIn');
                this.container.classList.add('flipOut');
            } else {
                this.container.classList.remove('flipIn');
                this.container.classList.remove('flipOut');
            }
        }
    }

    reset() {
        // TODO: set transition-speed to 0
        this._isFlipOut = false;
        this._isFlipIn = false;
        this.container.classList.remove('flipIn');
        this.container.classList.remove('flipOut');
        // TODO: reset transition-speed to original value
    }

    flipOut() {
        this.isFlipOut = true;
    }

    flipIn() {
        this.isFlipIn = true;
    }

    proceed() {
        if (this.isFlipOut) {
            console.log('A');
            this.reset();
        } else if (this.isFlipIn) {
            console.log('B');
            this.flipOut();
        } else {
            console.log('C');
            this.flipIn();
        }
    }
}

window.customElements.define('ziro-card', ZiroCard);
