import Canvas from "./Canvas";

class BFS {
  getNeighbors(node, queue) {
    let step = 5;
    queue.push({x: node.x+step, y: node.y+step});
    queue.push({x: node.x+step, y: node.y-step});
    queue.push({x: node.x+step, y: node.y});

    queue.push({x: node.x-step, y: node.y+step});
    queue.push({x: node.x-step, y: node.y-step});
    queue.push({x: node.x-step, y: node.y});

    queue.push({x: node.x, y: node.y+step});
    queue.push({x: node.x, y: node.y-step});
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        canvas.visitCell(node)
        visited.push(node);
        this.getNeighbors(node, queue);
      }
    }
    return null;
  }
}
export default BFS;
