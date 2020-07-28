import endIcon from '../assets/images/bullseye.png';
import startNodeIcon from '../assets/images/male-solid.png';

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.size = Canvas.size;
        this.nodes = [];
        this.colors = ['red', 'blue', 'pink', 'orange', 'yellow', 'green'];
        this.startIcon = new Image();
        this.startIcon.src = startNodeIcon;
        this.endNodeIcon = new Image();
        this.endNodeIcon.src = endIcon;
    }

    getColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    
    getNode(x, y) {
        return {x: x, y: y};
    }

    async loadGrid() {
        for (let r = 0; r < this.width / this.size; r++) {
            for (let c = 0; c < this.height / this.size; c++) {
                this.context.rect(r, c, this.size, this.size);
                this.nodes.push(this.getNode(r, c));
            }
        }
        this.context.fill();
    }
    
    visitCell(node) {
        this.context.fillStyle = this.getColor();
        this.context.fillRect(node.x, node.y, this.size - 1, this.size - 1);
    }

    setTargets(startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
    }

    renderTargets() {
        // Make sure all the images are loaded before rendering
        if (this.startIcon.complete && this.endNodeIcon.complete) {
            this.context.drawImage(this.startIcon, this.startNode.x, this.startNode.y, 8, 16);
            this.context.drawImage(this.endNodeIcon, this.endNode.x, this.endNode.y, 16, 16);
        } else {
            this.startIcon.onload = () => {
                this.context.drawImage(this.startIcon, this.startNode.x, this.startNode.y, 8, 16);
            }
            this.endNodeIcon.onload = () => {
                this.context.drawImage(this.endNodeIcon, this.endNode.x, this.endNode.y, 16, 16);
            }
        }
    }

    clear() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.width, this.height)
        this.renderTargets();
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }

    static get size() {
        return 5;
    }

    static get canvas() {
        return document.getElementById('canvas');
    }
}

export default Canvas;