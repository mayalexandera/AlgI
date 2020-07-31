import BFS from './BFS';
import DFS from './DFS';
import Merge from './MergeSort';
import QuickSort from './QuickSort';
import AStar from './AStar';
import Canvas from './Canvas';
import DFSV from './dfsTryAgain';

class AlgorithmHandler {
    constructor(canvas) {
        this.startNode = {x: 100, y: 150};
        this.endNode = {x: 60, y: 150};
        this.canvas = canvas;
        this.running = false;
        this.sorting = false;

        this.nodeCountElement = document.getElementById('node-count');

        // When page first loads automatically setup the canvas as bfs
        canvas.setTargets(this.startNode, this.endNode);
        canvas.renderTargets();
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async start() {
        this.running = true;
        this.canvas.runningAlgorithm = true;

        if (this.sorting) {
            if (this.currentAlgorithmName === 'merge') { this.currentAlgorithm = new Merge(); }
            if (this.currentAlgorithmName === 'quicksort') {this.currentAlgorithm = new QuickSort(); }
            this.currentAlgorithm._sort(this.canvas.towers, this.canvas)       

        } else {
            if (this.currentAlgorithmName === 'bfs') { this.currentAlgorithm = new BFS(); }
            if (this.currentAlgorithmName === 'dfs') { this.currentAlgorithm = new DFSV(); }

            return this.currentAlgorithm.start(this.canvas, this.canvas.startNode, this.canvas.endNode);

        }
    }

    stop() {
        this.currentAlgorithm.stop = true;
    }
}

export default AlgorithmHandler;