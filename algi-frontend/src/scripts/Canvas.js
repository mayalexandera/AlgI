import endIcon from '../assets/images/bullseye.png';
import startNodeIcon from '../assets/images/female-solid.png';

class Canvas {
    constructor() {
        this.layeredCanvas = document.getElementById('layered-canvas');
        this.layeredContext = this.layeredCanvas.getContext('2d');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.redSlider = document.getElementById('red-slider')
        this.greenSlider = document.getElementById('green-slider')
        this.blueSlider = document.getElementById('blue-slider')
        this.size = Canvas.size;
        this.color = {r: 255, g: 110, b: 0};
        this.startIcon = new Image();
        this.startIcon.src = startNodeIcon;
        this.endNodeIcon = new Image();
        this.endNodeIcon.src = endIcon;
        this.targetImage = null;
        this.isDragging = false;
        this.draggingNode = null;
        this.runningAlgorithm = false;
        this.towers = [];
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Event listeners
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.querySelectorAll('.slidecontainer').forEach(slider => {
            slider.addEventListener('change', this.handleColorChange.bind(this))
        })
    }

    getColor() {
        return `rgb(${this.color.r},${this.color.g},${this.color.b})`
    }

    visitCell(node) {
        if (!this.targetImage) {
            this.context.fillStyle = this.getColor();
            this.context.fillRect(node.x, node.y, this.size - 1, this.size - 1);
        } else {
            this.context.clearRect(node.x, node.y, this.size - 1, this.size - 1);
        }
    }

    renderTowers() {
        this.context.fillStyle = "white"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (const tower of this.towers) {
            if (!this.targetImage) {
                this.context.fillStyle = this.getColor();
                this.context.fillRect(tower.x, tower.y, tower.width - 1, tower.height - 1);
            } else {
                this.context.clearRect(tower.x, tower.y, tower.width - 1, tower.height - 1);
            }
        }
    }

    renderTower(tower, color='red') {
        this.context.fillStyle = color;
        this.context.fillRect(tower.x, tower.y, tower.width - 1, tower.height - 1);
    }

    handleColorChange(event){
        if (this.sorting) {
            this.renderTowers();
        }
        switch (event.target.name) {
          case "red-slider":
            this.color.r = event.target.value;
            break;
          case "green-slider":
            this.color.g = event.target.value;
            break;
          case "blue-slider":
            this.color.b = event.target.value;
            break;
        }
    }

    async setTowers() {
        this.towers = [];
        for(let i = 0; i < this.canvas.width / Canvas.size; i++) {
            const height = Math.floor(Math.random() * (this.canvas.height - 10));
            const tower = {x: i * Canvas.size, y: this.canvas.height - height, width: Canvas.size, height: height};
            this.towers.push(tower);
        }
        this.renderTowers();
    }

    setTargets(startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
    }

    setImage(image) {
        this.targetImage = image;
        this.renderImage();
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
            this.context.drawImage(this.endNodeIcon, this.endNode.x, this.endNode.y, this.size, this.size);
        } else {
            this.startIcon.onload = () => {
                this.context.drawImage(this.startIcon, this.startNode.x, this.startNode.y, 8, 16);
            }
            this.endNodeIcon.onload = () => {
                this.context.drawImage(this.endNodeIcon, this.endNode.x, this.endNode.y, this.size, this.size);
            }
        }
    }

    clear(sorting=false) {
        this.sorting = sorting;
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.width, this.height)
        if (sorting) {
            this.setTowers();
        } else {
            this.renderTargets();
        }
    }

    handleMouseDown(event) {
        if (this.runningAlgorithm) { return; }

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
    handleMouseUp() {
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

    static get width() {
        return Canvas.canvas.width;
    }
    static get height() {
        return Canvas.canvas.height;
    }
    static get size() {
        return 5;
    }
    static get canvas() {
        return document.getElementById('canvas');
    }
}
export default Canvas;