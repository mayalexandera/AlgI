import Canvas from './scripts/Canvas';
import Carousel from './scripts/Carousel';
import AlgorithmHandler from './scripts/AlgorithmHandler';

import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas();
  const carousel = new Carousel();
  const algoHandler = new AlgorithmHandler(canvas);

  const runButton = document.getElementById('run-button');
  const clearResults = document.getElementById('clear-results');
  const expandable = document.querySelector('.expandable');
  const nodeCountElement = document.getElementById('node-count');

  runButton.addEventListener('click', startAlgorithm);
  clearResults.addEventListener('click', clear);
  expandable.addEventListener('click', showDropdown);

  // Load the sample images
  carousel.loadImages();

  // Run the selected algorithm and when you're done change the run button look
  function startAlgorithm(event) {
    event.target.classList.toggle('warning');
    const icon = event.target.querySelector('i');
    if (icon.classList.contains('fa-stop')) {
      icon.classList = 'fa fa-play';
      algoHandler.stop();

    } else {
      icon.classList = 'fa fa-stop';
      clear();
      algoHandler.start('dfs').then((finished) => {
        event.target.classList.toggle('warning');
        icon.classList = 'fa fa-play';
      })
    }
  }

  // Handle dropdown events
  function showDropdown(event) {
    const dropdown = event.target.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    } else {
      // Update the play button
      console.log(event.target.textContent);
    }
  }

  // Clear the canvas and reset everything
  function clear() {
    nodeCountElement.textContent = "0";
    canvas.clear();
  }

})
