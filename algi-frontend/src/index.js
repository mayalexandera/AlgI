import Canvas from './scripts/Canvas';
import Carousel from './scripts/Carousel';
import BFS from './scripts/BFS';
import DFS from './scripts/DFS';

import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas();
  const carousel = new Carousel();

  const runButton = document.getElementById('run-button');
  const clearResults = document.getElementById('clear-results');
  const expandable = document.querySelector('.expandable');
  const nodeCountElement = document.getElementById('node-count');

  runButton.addEventListener('click', startAlgorithm);
  clearResults.addEventListener('click', clear);
  expandable.addEventListener('click', showDropdown);

  carousel.loadImages();

  // Set the start and end points
  const startNode = {x: 105, y: 20};
  const endNode = {x: 25, y: 100};
  canvas.showStartNode(startNode);
  canvas.showTargetNode(endNode);


  function startAlgorithm(event) {
    const playButton = event.target.querySelector('i');
    if (playButton.classList.contains('fa-stop')) {
      playButton.classList = 'fa fa-play';

    } else {
      playButton.classList = 'fa fa-stop';

      const dfs = new DFS();
      dfs.start(canvas, startNode, endNode);

     // const bfs = new BFS();
      //bfs.start(canvas, startNode, endNode);
    }
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
    nodeCountElement.textContent = "0";
    canvas.clear();
  }

})
