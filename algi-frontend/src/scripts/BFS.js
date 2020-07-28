import Canvas from "./Canvas";

class BFS {
  constructor() {
    this.nodeCountElement = document.getElementById('node-count');
  }

  withinBounds(position) {
    const canvas = Canvas.canvas;
    return (position.x >= 0 && position.x <= canvas.width && position.y >= 0 && position.y <= canvas.height);
  }

  getNeighbors(node, queue) {
    const step = Canvas.size;
    const moves = [[step, step], [step, -step], [-step, step], [-step, -step],
      [step, 0], [-step, 0], [0, step],[0, -step],
    ];

    moves.forEach((pos) => {
      const newX = pos[0];
      const newY = pos[1];
      const newNode = { x: node.x + newX, y: node.y + newY };
      if (this.withinBounds(newNode)) {
        queue.push(newNode);
      } 
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
    while (queue.length > 0 && !this.stop) {
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
