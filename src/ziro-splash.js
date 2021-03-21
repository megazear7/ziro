import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroSpash extends ZiroComponent {
    readyCallback() {
        this.maxThickness = 20;

        this.canvas = this.shadowRoot.querySelector('canvas');
        this._context = this.canvas.getContext('2d');
        this._center = { x: 0, y: 0 };
        this._size = -1;
        this._thickness = this.maxThickness;

        this._animation();
        this.addEventListener('click', e => this.splash(e));
    }

    styles() {
        return [css`
            :host, canvas {
                display: block;
                width: 100%;
                height: 100%;
            }

            canvas {
	            mix-blend-mode: screen;
            }
        `];
    }

    render() {
        return html`
            <canvas></canvas>
        `;
    }
    
    splash(e) {
        const clientRect = this.getBoundingClientRect();
        let x = Math.floor((e.clientX - clientRect.left) / this.s);
        let y = Math.floor((e.clientY - clientRect.top) / this.s);
        this._center = { x, y }
        this._size = 0;
    }

    _animation() {
        this._clear();
        if (this._size >= 0) {
            this._update();
            this._draw();
        }
        requestAnimationFrame(this._animation.bind(this));
    }

    _update() {
        if (this._size >= 0) {
            this._size = this._size += 1;
        } else if (this._size > this._width && this._size > this._height) {
            this._size = -1;
        }
    }

    _draw() {
        this.canvas.width = this._width;
        this.canvas.height = this._height;
        drawCircle({
            context: this._context,
            x: this._width / 2,
            y: this._height / 2,
            radius: this._size,
            fillStyle: 'rgba(0, 0, 0, 0.2)'
        });
    }

    _clear() {
        this._context.clearRect(0, 0, this._width, this._height);
    }

    get _width() {
        return this.offsetWidth;
    }

    get _height() {
        return this.offsetHeight;
    }
}

export function drawCircle({
        context,
        x = 0,
        y = 0,
        radius = 30,
        fillStyle = 'rgba(0, 0, 0, 1)'}) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = fillStyle;
    context.fill();
}

window.customElements.define('ziro-splash', ZiroSpash);
