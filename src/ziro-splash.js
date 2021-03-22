import html from './services/html.js';
import css from './services/css.js';
import ZiroComponent from './ziro-component.js';

class ZiroSpash extends ZiroComponent {
    readyCallback() {
        this._canvas = this.shadowRoot.querySelector('canvas');
        this._context = this._canvas.getContext('2d');
        this._center = { x: 0, y: 0 };
        this._size = -1;
        this._thickness = -1;
        this._opacity = 1;

        this._animation();
        this.addEventListener('click', e => this.splash(e));
    }

    get opacity() {
        if (this.attributes.opacity && this.attributes.opacity.value !== undefined) {
            const parsed = parseFloat(this.attributes.opacity.value);
            return parsed ? parsed : 0.5;
        } else {
            return 0.5;
        }
    }

    set opacity(val) {
        if (val) {
            this.setAttribute('opacity', val);
        } else {
            this.removeAttribute('opacity');
        }
    }

    get speed() {
        if (this.attributes.speed && this.attributes.speed.value !== undefined) {
            const parsed = parseFloat(this.attributes.speed.value);
            return parsed ? parsed : 1;
        } else {
            return 1;
        }
    }

    set speed(val) {
        if (val) {
            this.setAttribute('speed', val);
        } else {
            this.removeAttribute('speed');
        }
    }

    styles() {
        return [css`
            :host, canvas {
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
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
        this._center = { x: e.clientX - clientRect.left, y: e.clientY - clientRect.top }
        this._size = 0;
        this._thickness = 0;
        this._opacity = 1;
        this._maxSize = Math.max(...this._cornerDistances());
    }

    _cornerDistances() {
        return this._corners().map(corner => distanceBetween(this._center, corner));
    }

    _corners() {
        const clientRect = this.getBoundingClientRect();
        return [
            { x: 0, y: 0 },
            { x: clientRect.width, y: 0 },
            { x: clientRect.width, y: clientRect.height },
            { x: 0, y: clientRect.height }
        ];
    }

    _animation() {
        this._clear();
        if (this._size >= 0 && this._thickness >= 0) {
            this._draw();
            this._update();
        }
        requestAnimationFrame(this._animation.bind(this));
    }

    _update() {
        if (this._size >= 0) {
            this._size = this._size += this._effectiveSpeed;
            this._thickness = this._thickness += (this._effectiveSpeed * 2);
            this._effectiveOpacity = this.opacity * (1 - (this._size / this._maxSize));
        }
        
        if (this._size > this._maxSize) {
            this._size = -1;
            this._thickness = -1;
        }
    }

    _draw() {
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        drawCircle({
            context: this._context,
            x: this._center.x,
            y: this._center.y,
            radius: this._size,
            style: `rgba(0, 0, 0, ${this._effectiveOpacity})`
        });
    }

    _clear() {
        this._context.clearRect(0, 0, this._width, this._height);
    }

    get _effectiveSpeed() {
        return this.speed * (this._maxSize / 40);
    }

    get _width() {
        return this.offsetWidth;
    }

    get _height() {
        return this.offsetHeight;
    }
}

function drawCircle({
        context,
        x = 0,
        y = 0,
        radius = 30,
        style = 'rgba(0, 0, 0, 1)'}) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = style;
    context.fill();
}

function distanceBetween(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}

window.customElements.define('ziro-splash', ZiroSpash);
