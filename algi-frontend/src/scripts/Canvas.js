import endIcon from '../assets/images/bullseye.png';
import startNodeIcon from '../assets/images/male-solid.png';

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.layeredCanvas = document.getElementById('layered-canvas');
        this.layeredContext = this.layeredCanvas.getContext('2d');
        this.context = this.canvas.getContext('2d');
        this.size = Canvas.size;
        this.nodes = [];
        this.colors = ['red', 'blue', 'pink', 'orange', 'yellow', 'green'];
        //this.colors = ['white'];
        this.startIcon = new Image();
        this.startIcon.src = startNodeIcon;
        this.endNodeIcon = new Image();
        this.endNodeIcon.src = endIcon;
        this.targetImage = null;
        this.isDragging = false;
        this.draggingNode = null;

        // Event listeners
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    getColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    
    getNode(x, y) {
        return {x: x, y: y};
    }
    
    visitCell(node) {
        this.context.clearRect(node.x, node.y, this.size, this.size);
    }

    setTargets(startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
    }

    setImage(image) {
        this.targetImage = image;
    }

    renderImage() {
        if (this.targetImage) {
            this.layeredContext.drawImage(this.targetImage, 0, 0, this.canvas.width, this.canvas.height);
        }
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
        this.context.clearRect(0, 0, this.width, this.height)
        this.renderImage();
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.width, this.height)
        this.renderTargets();
    }

    handleMouseDown(event) {
        const mouseX = event.clientX - this.canvas.getBoundingClientRect().x;
        const mouseY = event.clientY - this.canvas.getBoundingClientRect().y;
        const padding = 20;

        if (mouseX >= this.startNode.x - padding && mouseX <= this.startNode.x + padding) {
            if (mouseY >= this.startNode.y - padding && mouseY <= this.startNode.y + padding) {
                this.isDragging = true;
                this.draggingNode = this.startNode;
            }
        } else if (mouseX >= this.endNode.x - padding && mouseX <= this.endNode.x + padding) {
            if (mouseY >= this.endNode.y - padding && mouseY <= this.endNode.y + padding) {
                this.isDragging = true;
                this.draggingNode = this.endNode;
            }
        }
    }
    handleMouseUp(event) {
        this.isDragging = false;
        this.draggingNode = null;
    }
    handleMouseMove(event) {
        if (this.isDragging) {
            const mouseX = event.clientX - this.canvas.getBoundingClientRect().x;
            const mouseY = event.clientY - this.canvas.getBoundingClientRect().y;

            this.draggingNode.x = mouseX - (mouseX % this.size);
            this.draggingNode.y = mouseY - (mouseY % this.size);
            this.clear();
        }
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }

    static get size() {
        return 3;
    }

    static get canvas() {
        return document.getElementById('canvas');
    }
}

export default Canvas;