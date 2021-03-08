import html from './services/html.js';
import css from './services/css.js';

class ZiroNav extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();

        this.addEventListener('ziro-nav-item-click', e => this.navItemClicked(e.target));
        this.querySelector('ziro-nav-item:nth-of-type(1)').setAttribute('selected', '');
    }

    style() {
        return css`
            :host {
                display: flex;
                width: 100vw;
                justify-content: center;
                box-sizing: border-box;
                position: fixed;
                bottom: 0;
                border-top: 1px solid #aaa;
                box-shadow: 0 0 20px 0px #aaa;
                background-color: white;
            }
        `;
    }

    render() {
        return html`
            ${this.style()}
            <slot></slot>
        `
    }

    navItemClicked(navItem) {
        this.querySelectorAll('ziro-nav-item').forEach((indexNavItem, index) => {
            if (indexNavItem === navItem) {
                indexNavItem.setAttribute('selected', '');
                this.dispatchEvent(new CustomEvent('ziro-nav-click', {
                    bubbles: true,
                    detail: { panelSelected: index }
                }));
            } else {
                indexNavItem.removeAttribute('selected');
            }
        });
    }
}

window.customElements.define('ziro-nav', ZiroNav);
