class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) {throw "Missing canvas";}

        this.context = this.canvas.getContext('2d');

        console.log("Canvas loaded.");
    }

    async loadGrid() {
        this.context.fillStyle = "red";
        for (let r = 0; r < this.width / 5; r++) {
            for (let c = 0; c < this.height / 5; c++) {
                this.context.rect(r * 6, c * 6, 5, 5);
                
            }
        }
        this.context.fill();
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
}

export default Canvas;