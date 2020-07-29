import Canvas from "./Canvas";

class DFS {

  withinBounds(position) {
    const canvas = Canvas.canvas;
    return (position.x >= 0 && position.x <= canvas.width && position.y >= 0 && position.y <= canvas.height);
  }
  getNeighbors(node, queue) {
    const neighbors = [];
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

    if (!node) {
      return queue.slice(0, 3);
    }
    
    MOVES.forEach((position) => {
      let newX = position[0];
      let newY = position[1];
      let newPosition = {x: node.x + newX, y: node.y + newY};
      
      if (this.withinBounds(newPosition)) {
        // Check if this new position is not already in neighbors
        let foundNode = false;
        for (const visitedNode of queue) {
          if (visitedNode.x == newPosition.x && visitedNode.y == newPosition.y) {
            foundNode = true;
            break;
          }
        }
        if (!foundNode) {neighbors.push(newPosition);}
      }
    })
    return neighbors;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async start(canvas, startPos, targetNode, queue=[]) {
    const neighbors = this.getNeighbors(startPos, queue);
    queue = queue.concat(neighbors);

    for (const node of neighbors) {
      if (node.x == targetNode.x && node.y == targetNode.y) {
        return node;
      }
      canvas.visitCell(node);
    }

    await this.sleep(1);
    this.start(canvas, neighbors[Math.floor(Math.random() * neighbors.length)], targetNode, queue);
  }
}

export default DFS;
