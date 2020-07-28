import Canvas from './scripts/Canvas';
import Carousel from './scripts/Carousel';
import AlgoPreview from './scripts/AlgoPreview';

import BFS from './scripts/BFS';
import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas();
  const carousel = new Carousel();
  new AlgoPreview(); // Load the algorithm preview boxes

  const runButton = document.getElementById('run-button');
  const clearResults = document.getElementById('clear-results');
  const expandable = document.querySelector('.expandable');
  const nodeCountElement = document.getElementById('node-count');

  runButton.addEventListener('click', startAlgorithm);
  clearResults.addEventListener('click', clear);
  expandable.addEventListener('click', showDropdown);

  carousel.loadImages();


  function startAlgorithm(event) {
    const playButton = event.target.querySelector('i');
    if (playButton.classList.contains('fa-stop')) {
      playButton.classList = 'fa fa-play';

    } else {
      playButton.classList = 'fa fa-stop';
    
      // Node x and y need to be divisible by nodeSize
      const startNode = {x: 105, y: 20};
      const endNode = {x: 25, y: 100};
      const bfs = new BFS();
  
      canvas.showTargetNode(endNode);
      bfs.start(canvas, startNode, endNode);
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
