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

        this.props().forEach(prop => {
            const config = typeof prop === 'string' ? { attr: prop, default: '', type: 'string' } : prop;

            if (!config.type) {
                config.type === 'string';
            }
            if (!config.default) {
                config.default === '';
            }

            if (config.attr) {
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
                    set: val => {
                        const oldVal = this[config.attr];
                        if (val) {
                            this.setAttribute(config.attr, config.type === 'bool' ? '' : val);
                        } else {
                            this.removeAttribute(config.attr);
                        }
                        if (val !== oldVal) {
                            this.updateProp(config.attr);
                        }
                    }
                });
            }
        });

        this.shadowRoot.innerHTML = this.render() || '';
        this.readyCallback();
    }

    props() {
        return [];
    }

    updateProp(attr) {
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