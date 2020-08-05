class Algorithm {
    constructor(canvas) {
        this.nodeCountElement = document.getElementById('node-count');
        this.canvas = canvas;
        this.stop = false;
        this.size = 5;
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    withinBounds(position) {
        return (
          position.x >= 0 &&
          position.x < this.canvas.width &&
          position.y >= 0 &&
          position.y < this.canvas.height
        );
    }
}

export default Algorithm;
