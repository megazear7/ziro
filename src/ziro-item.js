import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroItem extends ZiroComponent {
    readyCallback() {
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
        return [ 'selected' ];
    }

    styles() {
        return [css`
            div {
                display: inline-block;
                background-color: var(--zc-background-color);
                color: var(--zc-background-text-color);
                padding: var(--zc-space-small);
                margin: var(--zc-space-mini);
                border-radius: var(--zc-border-radius);
                border: var(--zc-light-border);
                cursor: pointer;
                transition: background-color var(--zc-transition-speed);
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
}

window.customElements.define('ziro-item', ZiroItem);
