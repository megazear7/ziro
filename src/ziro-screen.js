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

        this._forEachPanel(panel => this._initPanel(panel));
        this.addEventListener('ziro-panel-connected', e => this._initPanel(e.target));

        this._forEachNavItem(panel => this._initPanel(panel));
        this.addEventListener('ziro-nav-item-connected', () => this._initNavItem());

        if (this.history) {
            window.addEventListener('popstate', event => {
                const lastIndex = event.state && typeof event.state.index === 'number' ? event.state.index : this.originalIndex || 0;
                this.slideTo(lastIndex);
            });
        }
    }

    get history() {
        return this.attributes.history && this.attributes.history.value !== undefined || false;
    }

    set history(val) {
        if (val) {
            this.setAttribute('history', '');
        } else {
            this.removeAttribute('history');
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

    slideTo(index, useHistory) {
        useHistory = useHistory || false
        const panelSet = this.querySelector('ziro-panel-set');

        if (panelSet && typeof panelSet.slideTo === 'function') {
            const panels = panelSet.querySelectorAll('ziro-panel');
            if (useHistory && this.history && panels.length >= index && panels[index].path) {
                history.pushState({ index: index }, document.title || '', panels[index].path);
            }
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

    _initPanel(panel) {
        const activePanelIndex = this._activePanelIndex();

        if (activePanelIndex === undefined || this._pathMatches(panel.path)) {
            this.originalIndex = activePanelIndex || 0;
            panel.active = true;

            this._forEachPanel((indexedPanel, index) => {
                if (panel === indexedPanel) {
                    this.originalIndex = index;
                }
            });
        }
    }

    _initNavItem() {
        const activePanelIndex = this._activePanelIndex();

        if (activePanelIndex !== undefined) {
            this.originalIndex = activePanelIndex;
            this.slideTo(activePanelIndex, true);
        }
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
                this.slideTo(index, true);
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
