import Canvas from "./Canvas";

class BFS {
  getNeighbors(node, queue) {
    let step = 5;
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
          console.log("Finsihed");
          return node;
        }
        await this.sleep(0);
        canvas.visitCell(node);
        visited.push(node);
        this.getNeighbors(node, queue);
      }
    }
    return null;
  }
}
export default BFS;
