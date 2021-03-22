import html from './services/html.js';
import css from './services/css.js';
import buttonStyles from './styles/button.js';
import ZiroComponent from './ziro-component.js';

class ZiroButton extends ZiroComponent {
    readyCallback() {
        this.dispatchEvent(new CustomEvent('ziro-button-connected', {
            bubbles: true
        }));
    }

    styles() {
        return [buttonStyles, css`
            button {
                position: relative;
            }
        `];
    }

    render() {
        return html`
            <button part="button"><slot></slot><ziro-splash></ziro-splash></button>
        `;
    }
}

window.customElements.define('ziro-button', ZiroButton);
