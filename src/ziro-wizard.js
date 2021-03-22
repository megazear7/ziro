import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroWizard extends ZiroComponent {
    readyCallback() {
        this.addEventListener('ziro-panel-connected', e => {
            e.stopPropagation();
            this._firstPanel().active = true;
        }, { once: true });

        const firstPanel = this._firstPanel();
        if (firstPanel && this._activePanelIndex() === undefined) {
            firstPanel.active = true;
        }

        this.addEventListener('ziro-wizard-previous', e => {
            e.stopPropagation();
            this.previous()
        });

        this.addEventListener('ziro-wizard-next', e => {
            e.stopPropagation();
            this.next()
        });

        this.addEventListener('ziro-wizard-finish', e => {
            e.stopPropagation();
            this.finish()
        });

        this.addEventListener('ziro-wizard-end-early', e => {
            e.stopPropagation();
            this.endEarly()
        });

        this.addEventListener('ziro-closed', e => {
            e.stopPropagation();
            this.endEarly()
        });

        this.index = 0;
    }

    get speed() {
        if (this.attributes.speed && this.attributes.speed.value !== undefined) {
            return this.attributes.speed.value;
        } else {
            return 300;
        }
    }

    set speed(val) {
        if (val) {
            this.setAttribute('speed', '');
        } else {
            this.removeAttribute('speed');
        }
    }

    get active() {
        if (this.attributes.active && this.attributes.active.value !== undefined) {
            return val === '' || !! val && val !== 'false';
        } else {
            return false;
        }
    }

    set active(val) {
        if (val) {
            this.setAttribute('active', '');
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = this._slot();
                this.style.left = '0';
            }
        } else {
            this.removeAttribute('active');
            if (this.shadowRoot) {
                this.style.left = '100%';
                setTimeout(() => {
                    this.shadowRoot.innerHTML = '';
                }, this.speed);
            }
        }
    }

    styles() {
        return css`
            :host {
                overflow: hidden;
                display: block;
                z-index: 1;
                box-sizing: border-box;
                height: 100%;
                width: 100%;
                overflow-x: hidden;
                --zc-panel-index: 0;
                position: absolute;
                top: 0;
                left: 100%;
                transition: left ${this.speed}ms ease-in-out;
                background: white;
            }

            ::slotted(ziro-panel) {
                transition: left ${this.speed}ms ease-in-out;
            }

            ::slotted(ziro-panel:nth-of-type(1)) {
                left: calc(-1 * var(--zc-panel-index) * 100% + 0%);
            }

            ::slotted(ziro-panel:nth-of-type(2)) {
                left: calc(-1 * var(--zc-panel-index) * 100% + 100%);
            }

            ::slotted(ziro-panel:nth-of-type(3)) {
                left: calc(-1 * var(--zc-panel-index) * 100% + 200%);
            }

            ::slotted(ziro-panel:nth-of-type(4)) {
                left: calc(-1 * var(--zc-panel-index) * 100% + 300%);
            }

            ::slotted(ziro-panel:nth-of-type(5)) {
                left: calc(-1 * var(--zc-panel-index) * 100% + 400%);
            }

            ::slotted(ziro-panel:nth-of-type(6)) {
                left: calc(-1 * var(--zc-panel-index) * 100% + 500%);
            }
        `;
    }

    render() {
        return html`
            ${ this.active ? this._slot() : '' }
        `
    }

    start() {
        this.active = true;
    }

    next() {
        if (this.index < this._panelCount() - 1) {
            this.slideTo(this.index + 1);
        } else {
            this.finish();
        }
    }

    previous() {
        if (this.index > 0) {
            this.slideTo(this.index - 1);
        } else {
            this.endEarly();
        }
    }

    finish() {
        this._close();
        this.dispatchEvent(new CustomEvent('ziro-wizard-finished-successful', {
            bubbles: true
        }));
    }

    endEarly() {
        this._close();
        this.dispatchEvent(new CustomEvent('ziro-wizard-finished-unsuccessful', {
            bubbles: true
        }));
    }

    slideTo(index) {
        const oldIndex = this.index || 0;
        const panels = this.querySelectorAll('ziro-panel');
        
        if (index > panels.length-1) {
            this.index = panels.length-1;
        } else if (index < 0) {
            this.index = 0;
        } else {
            this.index = index;
        }

        panels[index].active = true;
        this.style.setProperty('--zc-panel-index', this.index);
        if (oldIndex !== this.index) {
            setTimeout(() => {
                panels[oldIndex].active = false;
            }, this.speed);
        }
    }

    _close() {
        this.active = false;
        setTimeout(() => this.slideTo(0), this.speed);

        this.dispatchEvent(new CustomEvent('ziro-wizard-closed', {
            bubbles: true
        }));
    }

    _slot() {
        return html`<slot></slot>`;
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

    _firstPanel() {
        return this.querySelector('ziro-panel');
    }

    _forEachPanel(callback) {
        this.querySelectorAll('ziro-panel').forEach((panel, index) => {
            callback(panel, index);
        });
    }

    _panelCount() {
        return this.querySelectorAll('ziro-panel').length;
    }
}

window.customElements.define('ziro-wizard', ZiroWizard);
