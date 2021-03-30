import theme from './styles/theme.js';

export default class ZiroComponent extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.adoptStyles(theme);
        const styles = this.styles();
        if (Array.isArray(styles)) {
            styles.forEach(style => {
                this.adoptStyles(style || '');
            });
        } else {
            this.adoptStyles(styles || '');
        }

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
                            } else {
                                return this.attributes[config.attr].value;
                            }
                        } else {
                            if (config.type === 'bool') {
                                return false;
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

        this.shadowRoot.innerHTML = this.render() || '';
        this.readyCallback();
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
                config.default === '';
            }
            return config;
        } else {
            console.error('No config for ' + prop + ' and class ' + this);
            return undefined;
        }
    }

    updateProp(name, oldValue, newValue, causeCallback, setAttribute) {
        const prop = this.constructor.props.filter(prop => prop === name || prop.attr === name);
        const config = prop !== undefined ? this.constructor.getConfig(name) : undefined;

        if (config) {
            if (setAttribute) {
                if (newValue) {
                    this.setAttribute(config.attr, config.type === 'bool' ? '' : newValue);
                } else {
                    this.removeAttribute(config.attr);
                }
            }
            if (newValue !== oldValue && causeCallback && this.shadowRoot) {
                this.propUpdated(config.attr);
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