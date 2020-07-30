import BFS from './BFS';
import DFS from './AStar';
import Merge from './MergeSort';
import QuickSort from './QuickSort';
import Canvas from './Canvas';

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

    start() {
        this.running = true;
        this.canvas.runningAlgorithm = true;

        if (this.sorting) {
            if (this.currentAlgorithmName === 'merge') { this.currentAlgorithm = new Merge(); }
            if (this.currentAlgorithmName === 'quicksort') {this.currentAlgorithm = new QuickSort(); }

            return new Promise(async (resolve, reject)  => {
                const sortedTowers = this.currentAlgorithm._sort(this.canvas.towers, this.canvas);

                for (let i = 0; i < sortedTowers.length; i++) {
                    this.nodeCountElement.textContent = parseInt(this.nodeCountElement.textContent, 10) + 1;
                    if (this.currentAlgorithm.stop) {
                        break;
                    }
                    sortedTowers[i].x = (i * Canvas.size);
                    this.canvas.towers = sortedTowers;
                    this.canvas.renderTowers();
                    await this.sleep(20);
                }
                this.canvas.towers = sortedTowers;
                this.canvas.renderTowers();
                resolve("Done");
            })
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