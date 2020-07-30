import Canvas from "./Canvas";
import Algorithm from "./Algorithm";
//pop() neighbors
//track visited through adjacencyList

class DFS extends Algorithm{
  createAdjacencyList(canvas) {
    //rows = canvas.height
    //cols = canvas.width
    
    let adjacencyList = [];
    const xCoords = canvas.width / canvas.size;
    const yCoords = canvas.height / canvas.size;
    console.log('canvas height', yCoords)
    for (let x = 0; x <= xCoords; x++) {
      for (let y = 0; y <= yCoords; y++) {
        let newPos = { x: x, y: y, visited: false, neighbors: [] };
        adjacencyList.push(newPos);
      }
    }
    //console.log(adjacencyList[0].visited); // this will set visited to true
    adjacencyList.forEach(node => {
      this.addNeighbors(node)
    })
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
      let newNeighbor = { x: node.x + newX, y: node.y + newY };
      if (this.withinBounds(newNeighbor)) {
        node.neighbors.push(newNeighbor);
      }
    })
  }

  async start(canvas, startPos, targetNode) {
    let targetX = 100
    let targetY = 65
    let stack =[{x: 100, y: 40}]

    let startNode, adjacencyList
    if(!adjacencyList) adjacencyList = this.createAdjacencyList(canvas);
    
    //finding node with startPos values
    console.log('stack', stack[0])
    startNode = findNodeinAdjacencyList(stack[0])

    //    will find node of a cell, 
    //    visitCell on canvas, 
    //    push cell to stack
    function findNodeinAdjacencyList(cell) {
      for(const listNode of adjacencyList) {
        if (cell.x == listNode.x && cell.y == listNode.y) {
          canvas.visitCell(cell);
          listNode.visited = true;
          stack.push(listNode)
          return listNode
        }
      }
    }
  
    function dfsHelper(currentNode){
      let nextNode, currentCell
      console.log('currentNode', currentNode, 'target coordinate', 'x', targetX, 'y', targetY)
      
      isTarget(currentNode)
      
      function isTarget(currentNode){
        if (currentNode.x == targetX && currentNode.y == targetY) {
        console.log("finished");
        return currentNode;
        } else {
          currentNode.neighbors.length > 0 ? getNextNeighbor(currentNode) : findNextNode();
        }
      }

      function getNextNeighbor(currentNode) {
        currentCell = currentNode.neighbors.pop();
        console.log("currentCell", currentCell);
        nextNode = findNodeinAdjacencyList(currentCell);
        console.log("nextNode", nextNode);
        return nextNode
      }

      function findNextNode(){
        currentCell = stack.pop()
        console.log(currentCell)
        nextNode = findNodeinAdjacencyList(currentCell)
        console.log('nextNode', nextNode)
        return nextNode
      }

      // setting currentNode to first neighbors
        console.log('stack', stack, 'nextnod', nextNode, 'adjList', adjacencyList)
        return dfsHelper(nextNode)
           //stack set to true || neighbor needs to be }}located in the adjacency list
    }
    await dfsHelper(startNode);

    await this.sleep(1);
    // this.start(
    //   canvas,
    //   neighbors[Math.floor(Math.random() * neighbors.length)],
    //   targetNode,
    //   stack
    // );
}}


export default DFS;
