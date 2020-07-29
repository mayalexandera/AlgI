import BFS from './BFS';
import DFS from './DFS';
import Canvas from './Canvas';

class AlgorithmHandler {
    constructor(canvas) {
        this.startNode = {x: 105, y: 20};
        this.endNode = {x: 25, y: 100};
        this.canvas = canvas;
        canvas.showStartNode(this.startNode);
        canvas.showTargetNode(this.endNode);
    }
    start(name) {
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
        return this.currentAlgorithm.init(this.canvas, this.startNode, this.endNode, []);
    }

    stop() {
        this.currentAlgorithm.stop = true;
    }
}

export default AlgorithmHandler;