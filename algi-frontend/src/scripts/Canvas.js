class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.size = 5;
        this.nodes = [];
    }
    
    node(x, y) {
        return {x: x, y: y};
    }

    async loadGrid() {
        for (let r = 0; r < this.width / this.size; r++) {
            for (let c = 0; c < this.height / this.size; c++) {
                this.context.rect(r, c, this.size, this.size);
                this.nodes.push(this.node(r, c));
            }
        }
        this.context.fill();
    }
    
    visitCell(node) {
        this.context.fillStyle = 'red';
        this.context.fillRect(node.x, node.y, this.size - 1, this.size - 1);
    }

    showTargetNode(node) {
        this.context.fillStyle = 'purple';
        this.context.fillRect(node.x, node.y, this.size, this.size);
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
}

export default Canvas;