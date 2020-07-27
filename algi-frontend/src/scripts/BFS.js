import Canvas from "./Canvas";

class BFS {
  constructor(val) {
    this.val = val; //start position
    this.neighbors = [];
  }
  //addNeighbor(node) {
  //  this.neighbors.push(node);

  static bfs(startPos, targetVal) {
    let queue = [startPos];
    visited = new Set();

    while (queue.length > 0) {
      node = queue.shift();
      while (!visited.has(node)) {
        if (node.val === targetVal) {
          return node.val;
        }
        visited.add(node);
        queue.push(node.neighbors);
      }
    }
    return nil;
  }
}
export default BFS;
