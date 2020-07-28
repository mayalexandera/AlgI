import Canvas from "./Canvas";

class DFS {

  getNeighbors(node, canvas) {
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
    
    let currentX = node.x;
    let currentY = node.y;

    MOVES.forEach((position) => {
      let newX = position[0];
      let newY = position[1];
      let newPosition = {x: currentX + newX, y: currentY + newY};
      // Check if the position is within bounds of canvas
      if (newPosition.x > 0 && newPosition.x < canvas.width && newPosition.y > 0 && newPosition.y < canvas.height) {
        neighbors.push(newPosition);
      }
    })
    return neighbors;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async start(canvas, startPos, targetNode) {
    const neighbors = this.getNeighbors(startPos, canvas);
  
    // Checks if we found the target node
    for (const node of neighbors) {
      canvas.visitCell(node);
      if (node.x == targetNode.x && node.y == targetNode.y) {
        console.log("Finished!");
        return node;
      }
    }
    await this.sleep(100);
    this.start(canvas, neighbors[Math.floor(Math.random() * neighbors.length)], targetNode);
  }
}

export default DFS;
