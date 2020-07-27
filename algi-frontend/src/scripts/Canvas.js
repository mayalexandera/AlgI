class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.grid = [];
    }
    
    point(x, y) {
        return {x: x, y: y};
    }

    async loadGrid() {
        for (let r = 0; r < this.width / 5; r++) {
            for (let c = 0; c < this.height / 5; c++) {
                this.context.rect(r * 6, c * 6, 5, 5);
                this.grid.push(this.point(r, c));
            }
        }
        this.context.fill();
    }

    visitedCell(x, y) {
        this.context.fillStyle = 'red';
        this.context.fillRect(x, y, 5, 5);
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
}

export default Canvas;