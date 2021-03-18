import theme from './styles/theme.js';

export default class ZiroComponent extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = this.render() || '';
        this.adoptStyles(theme);
        const styles = this.styles();
        if (Array.isArray(styles)) {
            styles.forEach(style => {
                this.adoptStyles(style || '');
            });
        } else {
            this.adoptStyles(styles || '');
        }
        this.readyCallback();
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