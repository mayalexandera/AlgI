import BFS from './BFS';
import DFS from './DFS';
import Merge from './MergeSort';
import QuickSort from './QuickSort';
import Canvas from './Canvas';

class AlgorithmHandler {
    constructor(canvas) {
        this.startNode = {x: 100, y: 150};
        this.endNode = {x: 60, y: 150};
        this.canvas = canvas;
        this.running = false;

<<<<<<< HEAD
        this.merger = new Merge();
        this.quickSort = new QuickSort();

        this.setCanvasTowers();
=======
        //this.merger = new Merge();
        //this.setCanvasTowers();

        //this.quickSort = new QuickSort;
>>>>>>> 9295c5158866e85ba879cc81b2b46943ae4f0fea

        canvas.setTargets(this.startNode, this.endNode);
        canvas.renderTargets();
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async setCanvasTowers() {
        const towers = [];
        for(let i = 0; i < this.canvas.width / Canvas.size; i++) {
            const height = Math.floor(Math.random() * (this.canvas.height - 10));
            const tower = {x: i * Canvas.size, y: this.canvas.height - height, width: Canvas.size, height: height};
            towers.push(tower);
        }
        this.canvas.setTowers(towers);
        await this.sleep(500);
        const sorted_array = this.merger._sort(towers, this.canvas);

        this.canvas.renderTowers();
    }

    start(name) {
        this.running = true;
        switch(name) {
            case 'bfs':
                this.currentAlgorithm = new BFS();
                break;
            case 'dfs':
                this.currentAlgorithm = new DFS();
                break;
            default:
                throw "Algorithm not found!"
        }

        return this.currentAlgorithm.start(this.canvas, this.canvas.startNode, this.canvas.endNode);
    }

    stop() {
        this.currentAlgorithm.stop = true;
    }
}

export default AlgorithmHandler;