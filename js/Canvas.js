class Canvas {
    constructor({ id, width = 500, height = 500, WINDOW = { LEFT: -5, BOTTOM: -5, WIDTH: 20, HEIGHT: 20 }, callbacks = {} } = {}) {
        if (id) {
            this.canvas = document.getElementById(id);
        } else {
            this.canvas = document.createElement('canvas');
            document.querySelector('body').appendChild(this.canvas);
        }
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        this.canvasV = document.createElement('canvas');
        this.contextV = this.canvasV.getContext('2d');
        this.canvasV.width = width;
        this.canvasV.height = height;
        this.stars = [];

        this.WINDOW = WINDOW;
        this.PI2 = 2 * Math.PI;
        this.start = [];
        this.end = [];
        this.colorlines = [];

        const wheel = (callbacks.wheel instanceof Function) ? callbacks.wheel : function () { };
        const mousemove = (callbacks.mousemove instanceof Function) ? callbacks.mousemove : function () { };
        const mouseup = (callbacks.mouseup instanceof Function) ? callbacks.mouseup : function () { };
        const mousedown = (callbacks.mousedown instanceof Function) ? callbacks.mousedown : function () { };
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousedown', mousedown);
    }

    xs(x) {
        return (x - this.WINDOW.LEFT) / this.WINDOW.WIDTH * this.canvas.width;
    }
    ys(y) {
        return this.canvas.height - (y - this.WINDOW.BOTTOM) / this.WINDOW.HEIGHT * this.canvas.height;
    }
    xsPolygon(x) {
        return x / this.WINDOW.WIDTH * this.canvas.width;
    }
    ysPolygon(y) {
        return this.canvas.height - y / this.WINDOW.HEIGHT * this.canvas.height;
    }
    sx(x) {
        return x * this.WINDOW.WIDTH / this.canvas.width;
    }
    sy(y) {
        return -y * this.WINDOW.HEIGHT / this.canvas.height;
    }

    createStars() {
        let scale = this.canvasV.height / 2.1 / 9;
        let w = this.canvasV.width / scale; // ширина окна в расчетных координатах
        let h = this.canvasV.height / scale;
        let stars = [];
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 10; j++) {
                // цвет задается как #xxyyzz, где xx - доля красного, yy - зеленого, zz - синего.
                let r = (0x1a0 + (Math.random()) * 0x5f).toString(16).substr(1, 2); // красный от a0 до a0 + 5f
                let g = (0x1a0 + (Math.random()) * 0x5f).toString(16).substr(1, 2);
                let b = (0x1a0 + (Math.random()) * 0x5f).toString(16).substr(1, 2);
                stars[i] = {
                    x: Math.random() * w * scale,
                    y: Math.random() * h * scale,
                    color: '#' + r + g + b
                };
                this.stars.push(stars[i]);
            }
        }
    }

    draw_stars() {
        for (var i0 = 0; i0 < this.stars.length; i0++) {
            this.contextV.fillStyle = this.stars[i0].color;
            this.contextV.fillRect(this.stars[i0].x, this.stars[i0].y, 1, 1);
        }
    }

    clear(color = '#dae8e2') {
        this.contextV.fillStyle = color;
        this.contextV.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    generateLines(size = this.canvas.width) {
        let max = this.PI2;
        let min = 0;
        let r;
        let g;
        let b;
        for (let i = 0; i <= size; i += 3) {
            this.start[i] = (Math.random() * (max - min) + min) + 3;
            this.end[i] = (Math.random() * (max - min) + min) - 0.4;
            if (i % 2 === 0) {
                r = 0;
                g = 0;
                b = Math.floor(Math.random() * (256));
                this.colorlines[i] = '#' + r.toString(16) + g.toString(16) + b.toString(16)
            } else {
                this.colorlines[i] = '#FFFFFF'
            }
        }
    }

    sky(size = this.canvas.width) {
        let x = 0;
        let y = 0;
        for (let i = 0; i <= size; i += 3) {
            this.contextV.beginPath();
            this.contextV.strokeStyle = this.colorlines[i];
            this.contextV.lineWidth = 0.3;
            this.contextV.arc(this.xs(x), this.ys(y), i, this.start[i], this.end[i]);
            this.contextV.stroke();
        }
    }

    linePolygon(x1, y1, x2, y2, color = '#FFC0CB', width = 2) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.lineWidth = width;
        this.contextV.moveTo(this.xsPolygon(x1), this.ysPolygon(y1));
        this.contextV.lineTo(this.xsPolygon(x2), this.ysPolygon(y2));
        this.contextV.stroke();
    }

    line(x1, y1, x2, y2, color = '#000000', width = 2) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.lineWidth = width;
        this.contextV.moveTo(this.xs(x1), this.ys(y1));
        this.contextV.lineTo(this.xs(x2), this.ys(y2));
        this.contextV.stroke();
    }

    point(x, y, color = '#000000', size = 1) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.arc(this.xsPolygon(x), this.ysPolygon(y), size, 0, this.PI2);
        this.contextV.stroke();
    }

    text(x, y, text, font = '25px bold Arial', color = '#000000') {
        this.contextV.fillStyle = color;
        this.contextV.font = font;
        this.contextV.fillText(text, this.xs(x), this.ys(y));
    }


    polygon(points, color = '#008800BB', number = 0, logic = false) {
        this.contextV.fillStyle = color;
        this.contextV.fillStroke = color;
        this.contextV.beginPath();
        this.contextV.moveTo(this.xsPolygon(points[0].x), this.ysPolygon(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.contextV.lineTo(this.xsPolygon(points[i].x), this.ysPolygon(points[i].y));
        }
        if (logic) {
            this.contextV.fillStyle = '#000000';
            this.contextV.font = '10px bold Arial';
            this.contextV.fillText(number, (this.xsPolygon(points[1].x) + this.xsPolygon(points[3].x)) / 2, (this.xsPolygon(points[1].y) + this.xsPolygon(points[3].y)) / 2);
            this.contextV.fillStyle = color;
        }
        this.contextV.closePath();
        this.contextV.fill();
    }

    render() {
        this.context.drawImage(this.canvasV, 0, 0);
    }
}