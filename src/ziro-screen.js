import html from './services/html.js';
import css from './services/css.js';

class ZiroScreen extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render();

        this.addEventListener('ziro-nav-item-selected', e => this._navItemClicked(e.target));
        this.addEventListener('ziro-panel-changed', e => this._panelChanged(e.target));
    
        this.querySelectorAll('ziro-nav ziro-nav-item').forEach((navItem, index) => {
            if (typeof navItem.attributes.selected !== 'undefined') {
                this.slideTo(index);
            }
        });

        this.addEventListener('ziro-panel-connected', e => {
            const activePanelIndex = this._activePanelIndex();

            if (activePanelIndex === undefined || this._pathMatches(e.target.path)) {
                e.target.active = true;
            }
        });

        this.addEventListener('ziro-nav-item-connected', () => {
            const activePanelIndex = this._activePanelIndex();

            if (activePanelIndex !== undefined) {
                this.slideTo(activePanelIndex);
            }
        });
    }

    get redirect() {
        return this.attributes.redirect && this.attributes.redirect.value !== undefined || false;
    }

    set redirect(val) {
        if (val) {
            this.setAttribute('redirect', '');
        } else {
            this.removeAttribute('redirect');
        }
    }

    style() {
        return css`
            :host {
                display: block;
                box-sizing: border-box;
                position: relative;
                height: 100vh;
                width: 100vw;
                min-height: -webkit-fill-available;
                overflow-x: hidden;
            }
        `;
    }

    render() {
        return html`
            ${this.style()}
            <slot></slot>
        `
    }

    slideTo(index) {
        const panelSet = this.querySelector('ziro-panel-set');

        if (panelSet && typeof panelSet.slideTo === 'function') {
            panelSet.slideTo(index);
        }

        this._forEachNavItem((element, elementIndex) => {
            if (elementIndex === index) {
                element.setAttribute('selected', '');
            } else {
                element.removeAttribute('selected');
            }
        });

        this._forEachPanel((element, elementIndex) => {
            if (elementIndex === index) {
                element.setAttribute('active', '');
            } else {
                element.removeAttribute('active');
            }
        });
    }

    _pathMatches(path) {
        const pathSegments = typeof path === 'string' ? path.split('/') : [];
        const urlPathSegments = window.location.pathname.split('/');

        if (pathSegments.length >= 2) {
            let matches = true;
            pathSegments.forEach((segment, index) => {
                if (segment !== urlPathSegments[index]) {
                    matches = false;
                }
            });
            return matches;
        } else {
            return false;
        }
    }

    _navItemClicked(navItem) {
        this._forEachNavItem((element, index) => {
            if (element === navItem) {
                this.slideTo(index);
            }
        });
    }

    _panelChanged(panel) {
        this._forEachPanel((element, index) => {
            if (element === panel) {
                this.slideTo(index);
            }
        });
    }

    _activePanelIndex() {
        let foundIndex = undefined;

        this._forEachPanel((panel, index) => {
            if (panel.active) {
                foundIndex = index;
            }
        });

        return foundIndex;
    }

    _forEachPanel(callback) {
        this.querySelectorAll('ziro-panel-set ziro-panel').forEach((panel, index) => {
            callback(panel, index);
        });
    }

    _forEachNavItem(callback) {
        this.querySelectorAll('ziro-nav ziro-nav-item').forEach((navItem, index) => {
            callback(navItem, index);
        });
    }
}

window.customElements.define('ziro-screen', ZiroScreen);
