import BFS from './BFS';
import DFS from './DFS';
import Merge from './MergeSort';
import quickSort from './QuickSort'
import Canvas from './Canvas';
import QuickSort from './QuickSort';

class AlgorithmHandler {
    constructor(canvas) {
        this.startNode = {x: 100, y: 150};
        this.endNode = {x: 60, y: 150};
        this.canvas = canvas;
        this.running = false;

        //this.merger = new Merge();
        //this.setCanvasTowers();

        //this.quickSort = new QuickSort;

        canvas.setTargets(this.startNode, this.endNode);
        canvas.renderTargets();
    }

    setCanvasTowers() {
        const towers = [];
        for(let i = 0; i < this.canvas.width; i++) {
            const height = Math.floor(Math.random() * (this.canvas.height - 10));
            towers.push(height);
        }
        this.canvas.setTowers(this.merger._sort(towers));
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