import Canvas from "./Canvas";

class DFS {

  getNeighbors(node, canvas, visited) {
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

  async start(canvas, startPos, targetNode, visited=[]) {

    const neighbors = this.getNeighbors(startPos, canvas, visited);
    
    // Checks if we found the target node
    for (const node of neighbors) {
      let foundNode = false;
      for (const cell of visited){
        if(!(node.x != cell.x && node.y != cell.y)) {
          foundNode = true;
          break;
        }
        if (foundNode){
          canvas.visitCell(node);
          visited.push(node);
          //console.log(visited);
        }
      }
      if (node.x == targetNode.x && node.y == targetNode.y) {
        console.log("Finished!");
        return node;
      }
    }
    await this.sleep(100);
    this.start(canvas, neighbors.indexOf(node), targetNode, visited)
    this.start(canvas, neighbors[Math.floor(Math.random() * neighbors.length)], targetNode, visited);
  }
}

export default DFS;
