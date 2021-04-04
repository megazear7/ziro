import html from './services/html.js';
import css from './services/css.js';
import deepEqual from './services/deep-equal.js';
import ZiroComponent from './ziro-component.js';

class ZiroItem extends ZiroComponent {
    static formAssociated = true;

    readyCallback() {
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = 0;
        }
        this.savedTabIndex = this.tabIndex
        if (!this.value || deepEqual(this.value, {})) {
            this.value = this.innerText;
        }

        this.dispatchEvent(new CustomEvent('ziro-item-connected', {
            bubbles: true
        }));

        this.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.which === 13 || e.keyCode === 13) {
                this.select();
            }
        }, { signal: this.signal });

        this.addEventListener('click', () => this.select(), { signal: this.signal });
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
                margin: var(--zc-space-mini);
            }

            div {
                text-align: center;
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
                padding: var(--zc-space-small);
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
            <div class="${this.selected ? 'selected' : ''}"><slot></div>
        `;
    }

    propUpdated(attr) {
        if (attr === 'selected') {
            this.findElement('div', div => {
                div.classList.toggle('selected', !!this.selected);
            });
        }
    }

    select() {
        this.selected = !this.selected;
        this.dispatchEvent(new CustomEvent('ziro-item-click', {
            bubbles: true
        }));
    }

    show() {
        this.tabIndex = this.savedTabIndex;
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
        this.savedTabIndex = this.tabIndex;
        this.tabIndex = '-1';
    }
}

window.customElements.define('ziro-item', ZiroItem);
