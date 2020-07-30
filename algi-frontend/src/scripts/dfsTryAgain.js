import Algorithm from "./Algorithm";
import Canvas from './Canvas';

class DFSV extends Algorithm {
    async start(canvas, startNode, endNode, visited=[]) {
        startNode = {neighbors: [], ...startNode};
        const stack = [startNode];
        visited.push(startNode);
        this.getNeighbors(stack[0], visited);

        for (const node of stack[0].neighbors) {
            canvas.visitCell(node);
            await this.sleep(1);
            this.start(canvas, node, endNode, visited);
        }
    }

    checkVisited(node, visited) {
        for (const visitedNode of visited) {
            if (node.x == visitedNode.x && node.y == visitedNode.y) {
                return true;
            }
        }
        return false;
    }

    getNeighbors(node, visited) {
        const step = Canvas.size;
        const MOVES = [
        [step, step],
        [step, -step],
        [-step, step],
        [-step, -step],
        [step, 0],
        [-step, 0],
        [0, step],
        [0, -step]
        ];

        let add = true;
        MOVES.forEach((move) => {
            const newX = move[0];
            const newY = move[1];
            const neighbor = { x: node.x + newX, y: node.y + newY };
            if (!this.checkVisited(neighbor, visited) && add && neighbor.x > 0 && neighbor.y < 300 && neighbor.x < 700 && neighbor.y > 0) {
                node.neighbors.push(neighbor);
                visited.push(neighbor);
                add = false;
                return;
            }
        })
        
    }
}

export default DFSV;