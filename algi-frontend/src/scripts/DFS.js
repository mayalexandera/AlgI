import Canvas from "./Canvas";

class DFS {
  getNeighbors(node, canvas, queue) {
    let step = Canvas.size;
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
    let currX = node[0];
    let currY = node[1];

    MOVES.forEach((pos) => {
      let newX = pos[0];
      let newY = pos[1];

      let newPos = { x: currX + newX, y: currY + newY };

      if (newPos.x < canvas.length && newPos.y < canvas[0].length)
        queue.push(newPos);
    });
    return queue;
  }

  dfs(canvas, startPos, targetNode) {
    let queue = [startPos]
    let visited = []

    const neighbors = getNeighbors(startPos, canvas);

    for (const pos of neighbors) {
      if (pos.x ==targetNode.x && pos.y ==targetNode.y) {
        return pos;
      }
    }
   
    for (let i = 0; i < start.children.length; i++) {
      let result = dfs(start.children[i], targetNode);
      if (result != null) {
        return result;
      }
    }
    return null;
  }
}

export default DFS;
