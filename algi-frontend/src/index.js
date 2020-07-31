import Canvas from './scripts/Canvas';
import Carousel from './scripts/Carousel';
import AlgorithmHandler from './scripts/AlgorithmHandler';

import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas();
  const carousel = new Carousel(canvas);
  const algoHandler = new AlgorithmHandler(canvas);

  const runButton = document.getElementById('run-button');
  const clearResults = document.getElementById('clear-results');
  const expandable = document.querySelector('.expandable');
  const nodeCountElement = document.getElementById('node-count');
  const algorithmTitleElement = document.getElementById('algorithm-title');
  const timeCountElement = document.getElementById('time-count');
  const navBar = document.querySelector('nav');
  const finishedMsg = document.querySelector('.help-msg').querySelector('span');

  runButton.addEventListener('click', startAlgorithm);
  clearResults.addEventListener('click', clearCanvas);
  expandable.addEventListener('click', showDropdown);
  expandable.querySelector('.dropdown').addEventListener('click', changeAlgorithm);
  navBar.addEventListener('mouseleave', hideDropDown);

  // Load the sample images
  carousel.loadImages();
  algoHandler.currentAlgorithmName = 'bfs';
  var seconds = 0;
  var minutes = 0;

  // Run the selected algorithm and when you're done change the run button look
  function startAlgorithm(event) {
    if (event.target.matches('#run-button')) {
      const icon = event.target.querySelector('i');
      if (icon.classList.contains('fa-stop')) {
        icon.classList = 'fa fa-play';
        event.target.classList.remove('warning');
        canvas.runningAlgorithm = false;
        algoHandler.stop();

      } else {
        icon.classList = 'fa fa-stop';
        event.target.classList.add('warning');

        clearCanvas();

        // When the algorithm is done, reset the run button
        timeCountElement.textContent = "0:00";
        seconds = 0;
        minutes = 0;
        const timer = setInterval(tick, 1000);

        algoHandler.start()
        .then(cleanUp)
        .catch(cleanUp)

        function cleanUp() {
          console.log("Cleaning up");
          finishedMsg.style.display = 'inline-block';
          event.target.classList.remove('warning');
          icon.classList = 'fa fa-play';
          canvas.runningAlgorithm = false;
          clearInterval(timer);
          algoHandler.running = false;
        }
      }
    }
  }

  // Handle dropdown events
  function showDropdown(event) {
    const dropdown = event.target.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }

  // Clear the canvas and reset everything
  function clearCanvas() {
    if (algoHandler.running) {return;}
    nodeCountElement.textContent = "0";
    timeCountElement.textContent = "0:00"
    seconds = 0;
    minutes = 0;
    canvas.clear(algoHandler.sorting);
    finishedMsg.style.display = "";
  }

  function changeAlgorithm(event) {
    // Changes the currently active algorithm on the navigation
    if (algoHandler.running) {return;}

    if (event.target.nodeName === 'SPAN' && !event.target.matches('.active')) {
      document.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
      })
      event.target.classList.add('active');
    } else {return; }

    switch (event.target.textContent) {
      case 'BFS':
        runButton.innerHTML = 'Run Breadth-first<i class="fa fa-play" aria-hidden="true"></i>'
        algorithmTitleElement.innerHTML = 'Breadth-first<span class = "slow-speed">(Low Performance)</span>'
        algoHandler.currentAlgorithmName = 'bfs';
        algoHandler.sorting = false;
        break;
      case 'DFS':
        runButton.innerHTML = 'Run Depth-first<i class="fa fa-play" aria-hidden="true"></i>'
        algorithmTitleElement.innerHTML = 'Depth-first<span class = "medium-speed">(Medium Performance)</span>'
        algoHandler.currentAlgorithmName = 'dfs';
        algoHandler.sorting = false;
        break;
      case 'Merge Sort':
        runButton.innerHTML = 'Run Merge Sort<i class="fa fa-play" aria-hidden="true"></i>'
        algorithmTitleElement.innerHTML = 'Merge Sort<span class = "slow-speed">(Low Performance)</span>'
        algoHandler.currentAlgorithmName = 'merge';
        algoHandler.sorting = true;
        break;
      
      case 'Quick Sort':
        runButton.innerHTML = 'Run Quick Sort<i class="fa fa-play" aria-hidden="true"></i>'
        algorithmTitleElement.innerHTML = 'Quick Sort<span class = "good-speed">(High Performance)</span>'
        algoHandler.currentAlgorithmName = 'quicksort';
        algoHandler.sorting = true;
        break;
    }
    canvas.clear(algoHandler.sorting);
  }

  function hideDropDown() {
    expandable.querySelector('.dropdown').classList.add('hidden');
  }

  function tick() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    timeCountElement.textContent = `${minutes}:${(seconds < 10) ? "0" + seconds : seconds}`;
  }
})


