import BFS from './BFS';
import DFS from './DFS';
import Canvas from './Canvas';

class AlgorithmHandler {
    constructor(canvas) {
        this.startNode = {x: 100, y: 150};
        this.endNode = {x: 60, y: 150};
        this.canvas = canvas;
        this.running = false;

        canvas.setTargets(this.startNode, this.endNode);
        canvas.renderTargets();
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
        //i want a function that sets up the nodes, from which we can pull neighbors, and remove when visited.
        //return this.currentAlgorithm.init(this.canvas, this.startNode, this.endNode, []);

        return this.currentAlgorithm.start(this.canvas, this.canvas.startNode, this.canvas.endNode);
    }

    stop() {
        this.currentAlgorithm.stop = true;
    }
}

export default AlgorithmHandler;