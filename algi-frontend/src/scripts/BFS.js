import Canvas from "./Canvas";

class BFS {
  constructor() {
    this.nodeCountElement = document.getElementById('node-count');
  }
  getNeighbors(node, queue) {
    let step = Canvas.size;
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

    let currX = node.x;
    let currY = node.y;

    MOVES.forEach((pos) => {
      let newX = pos[0];
      let newY = pos[1];
      let newPos = { x: currX + newX, y: currY + newY };
       queue.push(newPos);
    });
    return queue;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  visitedNode(targetNode, visited) {
    for (const node of visited) {
      if (node.x == targetNode.x && node.y == targetNode.y) {
        return true;
      }
    }
    return false;
  }

  async start(canvas, startPos, targetNode) {
    let queue = [startPos]; // {x: 0, y: 0} Start Point
    let visited = [];
    while (queue.length > 0) {
      let node = queue.shift();
      while (!this.visitedNode(node, visited)) {
        if (node.x == targetNode.x && node.y == targetNode.y) {
          console.log("Finished", node);
          return node;
        }
        await this.sleep(0);
        canvas.visitCell(node);
        visited.push(node);
        this.getNeighbors(node, queue);
        this.nodeCountElement.textContent = parseInt(this.nodeCountElement.textContent, 10) + 1;
      }
    }
    return null;
  }
}
export default BFS;
