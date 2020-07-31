import Canvas from "./Canvas";
import Algorithm from "./Algorithm";

class BFS extends Algorithm {

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

  visitedNode(targetNode, visited) {
    for (const node of visited) {
      if (node.x == targetNode.x && node.y == targetNode.y) {
        return true;
      }
    }
    return false;
  }

  async start(canvas, startPos, targetNode) {
    let queue = [startPos];
    let visited = [];
    
    while (queue.length > 0 && !this.stop) {
      let node = queue.shift();
      while (!this.visitedNode(node, visited)) {
        if (node.x == targetNode.x && node.y == targetNode.y) {
          console.log("Finished");
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
