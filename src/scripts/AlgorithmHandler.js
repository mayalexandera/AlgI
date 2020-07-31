import BFS from './BFS';
import DFS from './DFS';
import Merge from './Merge';
import QuickSort from './QuickSort';

class AlgorithmHandler {
    constructor(canvas) {
        this.startNode = {x: 400, y: 150};
        this.endNode = {x: 300, y: 150};
        this.canvas = canvas;
        this.running = false;
        this.sorting = false;

        this.nodeCountElement = document.getElementById('node-count');

        // When page first loads automatically setup the canvas as bfs
        canvas.setTargets(this.startNode, this.endNode);
        canvas.renderTargets();
    }

    async start() {
        this.running = true;
        this.canvas.runningAlgorithm = true;

        if (this.sorting) {
            if (this.currentAlgorithmName === 'merge') {this.currentAlgorithm = new Merge();}
            if (this.currentAlgorithmName === 'quicksort') {this.currentAlgorithm = new QuickSort(); }
            return this.currentAlgorithm._sort(this.canvas.towers, this.canvas)       

        } else {
            if (this.currentAlgorithmName === 'bfs') { this.currentAlgorithm = new BFS(); }
            if (this.currentAlgorithmName === 'dfs') { this.currentAlgorithm = new DFS(); }

            return this.currentAlgorithm.start(this.canvas, this.canvas.startNode, this.canvas.endNode);

        }
    }

    stop() {
        this.currentAlgorithm.stop = true;
    }
}

export default AlgorithmHandler;