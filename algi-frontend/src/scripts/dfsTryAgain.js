import Canvas from './Canvas';
import Algorithm from './Algorithm';

class DFSV extends Algorithm {

    async start(canvas, startNode, endNode) {
        this.stack = [];
        this.visited = new Set();
        this.canvas = canvas;
        this.endNode = endNode;

        this.createAdjacencyList();
        this.startNode = this.findNodeinAdjacencyList(startNode);
        this.stack.push(this.startNode)
        await this.dfsHelper(this.startNode).then(() => {
            return "Finished."
        });
    }

    createAdjacencyList() {
        this.adjacencyList = [];
        const xCoords = Canvas.width;
        const yCoords = Canvas.height;

        for (let i = 0; i < xCoords; i+=5) {
            for (let j = 0; j < yCoords; j+=5) {
                const newPos = { x: i, y: j, visited: false, neighbors: [] };
                this.getNeighbors(newPos)
                this.adjacencyList.push(newPos);
            }
        }
      }

    async dfsHelper(currentNode) {
        // Check if we're done
        if (currentNode.x == this.endNode.x && currentNode.y == this.endNode.y) {
            console.log("Finished");
            return currentNode;
        }

        let nextNode;
        if (currentNode.neighbors.length > 0) {
            nextNode = this.getNextNeighbor(currentNode);
        } else {
            nextNode = this.findNextNode();
        }
        this.nodeCountElement.textContent = parseInt(this.nodeCountElement.textContent, 10) + 1;
        this.canvas.visitCell(currentNode)
        await this.sleep(1);

        this.dfsHelper(nextNode)
    }


    getNextNeighbor(currentNode) {
        const index = Math.floor(Math.random() * currentNode.neighbors.length);
        const poppedNode = currentNode.neighbors.splice(index, 1)[0];
        const nextNode = this.findNodeinAdjacencyList(poppedNode);
        return nextNode
    }

    findNextNode(){
        const nextNode = this.findNodeinAdjacencyList(this.stack.pop())
        return nextNode
      }

    findNodeinAdjacencyList(cell) {
        for(const node of this.adjacencyList) {
          if (cell.x == node.x && cell.y == node.y) {
            node.visited = true;
            this.stack.push(node);
            return node
          }
        }
      }

    getNeighbors(node) {
        const step = Canvas.size;
        const MOVES = [
        [step, step],
        [step, -step],
        [-step, step],
        [-step, -step],
        [step, 0],
        [-step, 0],
        [0, step],
        [0, -step],
        ];

        MOVES.forEach((move) => {
            let newX = move[0];
            let newY = move[1];
            const newNeighbor = { x: node.x + newX, y: node.y + newY };
            if (this.withinBounds(newNeighbor)) {
                node.neighbors.push(newNeighbor);
            }
        })
    }
}

export default DFSV;