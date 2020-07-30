import Canvas from "./Canvas";

class Algorithm {
    constructor() {
        this.nodeCountElement = document.getElementById('node-count');
        this.stop = false;
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    
    withinBounds(position) {
        const canvas = Canvas.canvas;
        return (
          position.x >= 0 &&
          position.x < canvas.width &&
          position.y >= 0 &&
          position.y < canvas.height
        );
    }
}

export default Algorithm;