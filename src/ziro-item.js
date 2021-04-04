import html from './services/html.js';
import css from './services/css.js';
import deepEqual from './services/deep-equal.js';
import ZiroComponent from './ziro-component.js';

class ZiroItem extends ZiroComponent {
    readyCallback() {
        if (!this.value || deepEqual(this.value, {})) {
            this.value = this.innerText;
        }

        this.dispatchEvent(new CustomEvent('ziro-item-connected', {
            bubbles: true
        }));

        this.addEventListener('click', () => {
            this.selected = !this.selected;
            this.dispatchEvent(new CustomEvent('ziro-item-click', {
                bubbles: true
            }));
        });
    }

    static get props() {
        return [
            'selected',
            'animateWidth',
            { attr: 'speed', type: 'number', default: '300' },
            { attr: 'value', type: 'json' }
        ];
    }

    styles() {
        return [css`
            :host {
                display: inline-block;
                overflow: hidden;
                transition: height ${this.speed}ms, width ${this.speed}ms;
                box-sizing: border-box;
            }

            div {
                text-align: center;
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
                padding: var(--zc-space-small);
                margin: var(--zc-space-mini);
                border-radius: var(--zc-border-radius);
                border: var(--zc-light-border);
                cursor: pointer;
                transition: background-color var(--zc-transition-speed);
                text-overflow: clip;
                white-space: nowrap;
                overflow: hidden;
            }

            div:hover, div:focus {
                border: var(--zc-primary-border);
            }

            div.selected {
                background-color: var(--zc-primary-color);
                color: var(--zc-primary-text-color);
                border: var(--zc-primary-border);
            }

            div:focus {
                outline: none;
            }
        `];
    }

    render() {
        return html`
            <div class="${this.selected ? 'selected' : ''}" tabindex="0"><slot></div>
        `;
    }

    propUpdated(attr) {
        if (attr === 'selected') {
            this.findElement('div', div => {
                div.classList.toggle('selected', !!this.selected);
            });
        }
    }

    show() {
        const savedTransition = this.style.transition;
        this.style.transition = 'none';
        this.style.height = 'auto';
        this.style.width = 'auto';
        this.savedHeight = this.offsetHeight;
        this.savedWidth = this.offsetWidth;
        this.style.transition = savedTransition;

        this.style.height = '0';
        if (this.animateWidth) {
            this.style.width = '0';
        }
        setTimeout(() => {
            this.style.height = this.savedHeight + 'px';
            if (this.animateWidth) {
                this.style.width = (this.savedWidth + 1) + 'px';
            }
            setTimeout(() => {
                this.style.width = 'auto';
                this.style.height = 'auto';
            }, this.speed)
        }, 0);
    }

    hide() {
        this.style.height = '0';
        if (this.animateWidth) {
            this.style.width = '0';
        }
    }
}

window.customElements.define('ziro-item', ZiroItem);
