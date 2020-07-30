import Algorithm from "./Algorithm";

class AStar extends Algorithm {

  init() {
    this.grid = [[], []];
    for (let i = 0; i < 400; i++) {
      for (let j = 0; j < 800; j++) {
        this.grid[i][j] = {x: i, y: j}
      }
    }
  }

  async start(canvas, startNode, target) {
    let closedSet = []

    this.init();
    let openSet = [startNode]

     this.neighbors = [
      { x: 1, y: 0, c: 1 },
      { x: 1, y: 1, c: 1.4 },
      { x: 1, y: -1, c: 1.4 },
      { x: -1, y: 0, c: 1 },
      { x: -1, y: 1, c: 1.4 },
      { x: -1, y: -1, c: 1.4 },
      { x: 0, y: 1, c: 1 },
      { x: 0, y: -1, c: 1 },
      ];

      startNode = { x: 1, y: 1, f: 0, g: 0 }
      target = { x: 8, y: 8, f: 0, g: 0 }
      let path = []
      findNeighbor(this.grid);      

    function findNeighbor( arr, n ) {
      let a;
      for(let i = 0; i < arr.length; i++){
        a = arr[i]
        if(n.x === a.x && n.y === a.y) return i;
      }
      return -1
    }

    async function addNeighbors( curr ) {
      let p
      for(let i = 0; i < this.neighbors.length; i++) {
        let n = {
          x: curr.x + this.neighbors[i].x, 
          y: curr.y + this.neighbors[i].y, 
          g: 0, 
          h: 0, 
          prt: {x:curr.x, y:curr.y}
        }
        canvas.visitCell(n);
        await this.sleep(50);

        if(this.grid[n.x][n.y] == 1 || findNeighbor( closedSet, n ) > -1 ) continue;

        n.g = curr.g + neighbors[i].c; 
        n.h = Math.abs(target.x - n.x) + Math.abs(target.x - n.y)

        p = findNeighbor(openSet, n)
        if(p > -1 && openSet[p].g + openSet[p].h <= n.g + n.h ) continue;

        openSet.push(n)
      }
      openSet.sort((a,b) => { return (a.g + a.h) - (b.g + b.h)});
    }

    function createPath() {
      path = []
      let a,b;
      a = closedSet.pop();
      path.push(a);
      while(closedSet.length) {
        b = closedSet.pop();
        if(b.x != a.part.x || b.y != a.prt.y) continue;
        a = b; path.push(a);
      }
    }

    function solveMap() {
      if (openSet.length < 1) return 'not possible';
      let curr = openSet.splice(0, 1)//[0]
      closedSet.push(curr);
      if(curr.x == target.x && curr.y == target.y) {
        createPath()
        return 'finished';
      }
      addNeighbors(curr);
    }
  }

}

export default AStar;

/*
//NOTES///
    f(n) = g(n) + h(n)
    //where g(n) if the cost required to reach the current state from given initial state

    g(n)
    // is the minimum cost from initial node to n

    h(n)
    // is the minimum cost from n to the closest objective to n

    h(n) = (x - p) + (y - q)
    //where x and y are cell co ordinates in the current state.
    //       p and q are cell-coordinates in the final state

    //manhattan distance formula:
    //"g" value - how far away this node is from start
    distanceG = abs(from.x - to.x) + abs(from.y + to.y)

    //"h" value - how far this node is from the target
    distanceH = abs(to.x - target.x) + abs(to.y + target.y)

    //"f" value is the sum of values G and H.
    valueF = distanceG + distanceG

*/
  
