import Canvas from './scripts/Canvas';
import BFS from './scripts/BFS';
import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas();
  //canvas.loadGrid();


  let targetNode = {x: 100, y: 20};
  canvas.showTargetNode(targetNode);
  const bfs = new BFS();
  bfs.start(canvas, {x: 205, y: 20}, targetNode);

})
