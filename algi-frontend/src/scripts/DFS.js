import Canvas from "./Canvas";
//pop() neighbors
//track visited through adjacencyList

class DFS {
  createNodeTree(canvas) {
    //rows = canvas.height
    //cols = canvas.width
    let adjacencyList = [];
    const cols = canvas.width / canvas.size;
    const rows = canvas.height / canvas.size;
    for (let x = 0; x <= cols; x++) {
      for (let y = 0; y <= rows; y++) {
        let newPos = { x: x, y: y, visited: false, neighbors: [] };
        adjacencyList.push(newPos);
      }
    }
    //console.log(adjacencyList[0].visited); // this will set visited to true
    adjacencyList.forEach(node => {
      this.addNeighbors(node, adjacencyList)
    })
    //console.log(adjacencyList)

    return adjacencyList
  }

  addNeighbors(node) {
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

    MOVES.forEach((move) => {
      let newX = move[0];
      let newY = move[1];
      let newPosition = { x: node.x + newX, y: node.y + newY, visited: false };
      if (this.withinBounds(newPosition)) {
        // Check if this new position is not already in neighbors
        //this wasn't working
         //&& (!node.neighbors.filter(pos => pos.x == newPosition.x && //pos.y == newPosition.y))
        node.neighbors.push(newPosition);
      }
    })
  }

  withinBounds(position) {
    const canvas = Canvas.canvas;
    return (
      position.x >= 0 &&
      position.x <= canvas.width &&
      position.y >= 0 &&
      position.y <= canvas.height
    );
  }

  getNeighbors(node, stack) {
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
      return stack.slice(0, 3);
    }

    MOVES.forEach((position) => {
      let newX = position[0];
      let newY = position[1];
      let newPosition = { x: node.x + newX, y: node.y + newY };

      if (this.withinBounds(newPosition)) {
        // Check if this new position is not already in neighbors
        let foundNode = false;
        for (const visitedNode of stack) {
          if (
            visitedNode.x == newPosition.x &&
            visitedNode.y == newPosition.y
          ) {
            foundNode = true;
            break;
          }
        }
        if (!foundNode) {
          neighbors.push(newPosition);
        }
      }
    });
    return neighbors;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async start(canvas, startPos, targetNode, stack = []) {
    let startNode, adjacencyList
    if(!adjacencyList)adjacencyList = this.createNodeTree(canvas);
    
    let startX = startPos.x/canvas.size
    let startY = startPos.y/canvas.size
    adjacencyList.forEach(pos => {
      if(pos.x === startX && pos.y === startY){
        startNode = pos
        //console.log('position:', pos, 'startPos:',startPos)
      }
    })
 
    function dfsHelper(pos){
      console.log('pos',pos)
      let targX, targY
      targX = targetNode.x/canvas.size
      targY = targetNode.y/canvas.size

      if (pos.x == targX && pos.y == targY){
        console.log('finished')
        return pos
      }
      
      if(pos.visited == true) return false
      pos.visited = true
      canvas.visitCell(pos)
      pos.neighbors.forEach(neighbor => {
        console.log('neighbor', neighbor)
       if (neighbor.visited == false)return dfsHelper(neighbor)
     })
    }
    console.log('startNode', startNode);
    dfsHelper(startNode);


    // for (const node of neighbors) {
    //   if (node.x == targetNode.x && node.y == targetNode.y) {
    //     return node;
    //   }
    //   canvas.visitCell(node);
    // }

    // await this.sleep(1);
    // this.start(
    //   canvas,
    //   neighbors[Math.floor(Math.random() * neighbors.length)],
    //   targetNode,
    //   stack
    // );
  }
}


export default DFS;
