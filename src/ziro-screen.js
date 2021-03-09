import html from './services/html.js';
import css from './services/css.js';

class ZiroScreen extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();

        this.addEventListener('ziro-nav-item-selected', e => this.navItemClicked(e.target));
    
        this.querySelectorAll('ziro-nav ziro-nav-item').forEach((navItem, index) => {
            if (typeof navItem.attributes.selected !== 'undefined') {
                this.slideTo(index);
            }
        })
    }

    style() {
        return css`
            :host {
                display: block;
                box-sizing: border-box;
            }
        `;
    }

    navItemClicked(navItem) {
        this.querySelectorAll('ziro-nav ziro-nav-item').forEach((indexNavItem, index) => {
            if (indexNavItem === navItem) {
                indexNavItem.setAttribute('selected', '');
                this.slideTo(index);
            } else {
                indexNavItem.removeAttribute('selected');
            }
        });
    }

    render() {
        return html`
            ${this.style()}
            <slot></slot>
        `
    }

    slideTo(index) {
        this.querySelector('ziro-panel-set').slideTo(index);
    }
}

window.customElements.define('ziro-screen', ZiroScreen);
