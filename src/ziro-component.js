import globalStyles from './styles/globals.js';

export default class ZiroComponent extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});

        this.constructor.props.forEach(prop => {
            const config = this.constructor.getConfig(prop);
            if (config) {
                Object.defineProperty(this, config.attr, {
                    get: () => {
                        if (this.attributes[config.attr] && this.attributes[config.attr].value !== undefined) {
                            if (config.type === 'bool') {
                                return true;
                            } else if (config.type === 'json') {
                                try {
                                    return JSON.parse(this.attributes[config.attr].value);
                                } catch {
                                    return {};
                                }
                            } else if (config.type === 'number') {
                                return parseFloat(this.attributes[config.attr].value);
                            } else if (config.type === 'int') {
                                return parseInt(this.attributes[config.attr].value);
                            } else {
                                return this.attributes[config.attr].value;
                            }
                        } else {
                            if (config.type === 'bool') {
                               return false;
                            } else if (config.type === 'json') {
                                return config.default || {};
                            } else {
                                return config.default;
                            }
                        }
                    },
                    set: newValue => {
                        this.updateProp(config.attr, this[config.attr], newValue, false, true);
                    }
                });
            }
        });

        this.constructor.elements.forEach(element => {
            this[element.name] = callback => this.findElement(element.selector, callback);
        });

        this.adoptStyles(globalStyles);
        const styles = this.styles();
        if (Array.isArray(styles)) {
            styles.forEach(style => {
                this.adoptStyles(style || '');
            });
        } else {
            this.adoptStyles(styles || '');
        }

        this.shadowRoot.innerHTML = this.render() || '';
        this.eventController = new AbortController();
        this.signal = this.eventController.signal;

        this.listeners = [];
        this.readyCallback();
    }

    disconnectedCallback() {
        this.eventController.abort();
    }

    static get elements() {
        return [ ];
    }

    static get observedAttributes() {
        return this.props
            .filter(prop => typeof prop === 'string' ? true : !!prop.attr)
            .map(prop => typeof prop === 'string' ? prop : prop.attr);
    }

    static get props() {
        return [];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.updateProp(name, oldValue, newValue, true, false);
    }

    propUpdated(attr) {
    }
    
    static getConfig(prop) {
        if (prop) {
            const config = typeof prop === 'string' ? { attr: prop, default: '', type: 'string' } : prop;

            if (!config.type) {
                config.type === 'string';
            }
            if (!config.default) {
                if (config.type === 'bool') {
                    config.default === false;
                } else if (config.type === 'json') {
                    config.default = {};
                } else {
                    config.default === '';
                }
            }
            return config;
        } else {
            console.error('No config for ' + prop + ' and class ' + this);
            return undefined;
        }
    }

    updateProp(name, oldValue, newValue, causeCallback, setAttribute) {
        const prop = this.constructor.props.filter(prop => prop === name || prop.attr === name)[0];
        const config = prop !== undefined ? this.constructor.getConfig(prop) : undefined;

        if (config.type === 'json' && !setAttribute) {
            try {
                newValue = JSON.parse(newValue);
            } catch {}
        }

        if (config) {
            if (setAttribute) {
                if (newValue) {
                    if (config.type === 'bool') {
                        this.setAttribute(config.attr, '');
                    } else if (config.type === 'json') {
                        this.setAttribute(config.attr, JSON.stringify(newValue));
                    } else {
                        this.setAttribute(config.attr, newValue);
                    }
                } else {
                    this.removeAttribute(config.attr);
                }
            }
            if (newValue !== oldValue && causeCallback && this.shadowRoot) {
                this.propUpdated(config.attr);
            }
        }
    }

    findElement(selector, callback) {
        if (this.shadowRoot) {
            const element = this.shadowRoot.querySelector(selector);

            if (element) {
                callback(element);
            }
        }
    }

    readyCallback() {
    }

    adoptStyles(styles) {
        const sheet = new CSSStyleSheet()
        sheet.replaceSync(styles);
        this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, sheet];
    }

    styles() {
        return '';
    }
}