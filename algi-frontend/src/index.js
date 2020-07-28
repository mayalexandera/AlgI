import Canvas from './scripts/Canvas';
import BFS from './scripts/BFS';
import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas();
  const runButton = document.getElementById('run-button');
  const clearResults = document.getElementById('clear-results');
  const expandable = document.querySelector('.expandable');

  runButton.addEventListener('click', startAlgorithm);
  clearResults.addEventListener('click', clear);
  expandable.addEventListener('click', showDropdown);
  

  function startAlgorithm() {
    // Node x and y need to be divisible by nodeSize
    const startNode = {x: 105, y: 20};
    const endNode = {x: 25, y: 100};
    const bfs = new BFS();

    canvas.showTargetNode(endNode);
    bfs.start(canvas, startNode, endNode);
  }

  function showDropdown(event) {
    const dropdown = event.target.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    } else {
      // Update the play button
      console.log(event.target.textContent);
    }
  }

  function clear() {
    canvas.clear();
  }

})
