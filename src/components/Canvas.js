import React from 'react';
import endIcon from '../images/bullseye.png';
import startIcon from '../images/female-solid.png';
import algorithmData from '../data.json';

import Navigation from './Navigation';
import Carousel from './Carousel';
import BFS from './algorithms/BFS';
import DFS from './algorithms/DFS';
import Merge from './algorithms/Merge';
import QuickSort from './algorithms/QuickSort';
import SelectionSort from './algorithms/SelectionSort';
import Bubblesort from './algorithms/Bubblesort';

class Canvas extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 0,
      minutes: 0,
      nodes: 0,
    }

    this.runningAlgorithm = false;
    this.startNode = { x:400, y:150 };
    this.endNode = { x:300, y:150 };
    this.currentAlgorithm = null;
    this.currentAlgorithmName = "Breadth-first";

    this.sorting = false;
    this.timer = null;
    this.targetImage = null;

    this.startNodeIcon = new Image();
    this.startNodeIcon.src = startIcon;
    this.endNodeIcon = new Image();
    this.endNodeIcon.src = endIcon;

    // Towers and node size
    this.towers = [];
    this.nodeSize = 5;
    this.nodeColors = {r: 220, g: 220, b: 30};
    this.isDragging = false;
    this.draggedIcon = null;

    // Canvas properties
    this.canvas = React.createRef();
    this.context = null;
    this.layeredCanvas = React.createRef();
    this.layeredContext = null;

    this.width = 800;
    this.height = 400;

    this.algorithmTitleElement = React.createRef();
    this.finishedMessage = React.createRef();
    this.nodeCountElement = React.createRef();
  }

  // Render the targets as soon as the component loads
  componentDidMount() {
    this.context = this.canvas.current.getContext('2d');
    this.layeredContext = this.layeredCanvas.current.getContext('2d');
    this.renderTargets();
  }

  componentDidUpdate() {
    this.context = this.canvas.current.getContext('2d');
    this.layeredContext = this.layeredCanvas.current.getContext('2d');
  }

  async start() {
    this.clear();
    this.runningAlgorithm = true;
    
    // Set the current algorithm instance
    switch (this.currentAlgorithmName) {
      case "Breadth-first":
        this.currentAlgorithm = new BFS(this);
        break;
      case "Depth-first":
        this.currentAlgorithm = new DFS(this);
        break;
      case "Merge Sort":
        this.currentAlgorithm = new Merge(this);
        break;
      case "Quick Sort":
        this.currentAlgorithm = new QuickSort(this);
        break;
      case "Selection Sort":
        this.currentAlgorithm = new SelectionSort(this);
        break;
      case "Bubble Sort":
        this.currentAlgorithm = new Bubblesort(this);
        break;
      default:
        break;
    }
    // Start the timer
    this.timer = setInterval(this.tick, 1000);

    // Depending on which algorithm it is start it and return a promise to indicate its done
    if (this.sorting) {
        return this.currentAlgorithm._sort(this.towers, this).then((data) => {
            this.stop();
            return data;
        })
    } else {
        return this.currentAlgorithm.start(this.startNode, this.endNode).then((data) => {
            this.stop();
            return data;
        })
    }
  }

  // Stops the current running algorithm
  stop() {
    clearInterval(this.timer);
    this.runningAlgorithm = false;
    this.currentAlgorithm.stop = true;
    this.finishedMessage.current.style.display = "inline-block";
  }

  // Clear the canvas and reset the properties
  clear() {
    if (this.runningAlgorithm) return;

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.width, this.height);

    this.setState({
      nodes: 0,
      seconds: 0,
      minutes: 0
    });

    this.nodeCountElement.current.innerHTML = 0;
    this.finishedMessage.current.style.display = "";

    // If sorting reset the towers else the nodes
    if (this.sorting) {
      this.setTowers();
    } else {this.renderTargets(); }
  }

  // Updates the current timer
  tick = () => {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;

    seconds += 1;
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }
    this.setState({
      seconds: seconds,
      minutes: minutes
    })
  }

  // Clear the canvas and draw the startNode and endNode
  renderTargets() {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.drawImage(this.startNodeIcon, this.startNode.x, this.startNode.y, 8, 16);
    this.context.drawImage(this.endNodeIcon, this.endNode.x, this.endNode.y, this.nodeSize, this.nodeSize);
  }

  // Clear the canvas and draw the towers
  renderTowers() {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.width, this.height);
    for (const tower of this.towers) {
      if (this.targetImage) {
        this.context.clearRect(tower.x, tower.y, tower.width-1, tower.height-1);
      } else {
        this.context.fillStyle = this.getColor();
        this.context.fillRect(tower.x, tower.y, tower.width-1, tower.height-1);
      }
    }
  }
  // Renders a single tower
  renderTower = (tower, newColor = "red") => {
    this.context.fillStyle = newColor;
    this.context.fillRect(tower.x, tower.y, tower.width - 1, tower.height - 1);
  }

  // Draw an image to the bottom canvas
  renderImage() {
    if (this.targetImage) {
      this.layeredContext.drawImage(this.targetImage, 0, 0, this.width, this.height);
    }
  }

  // Empty the current towers and set a new array of towers
  setTowers() {
    this.towers = [];
    for(let i = 0; i < this.width / this.nodeSize; i++) {
      const maxHeight = Math.floor(Math.random() * this.height - 50) + 50;
      const x = i * this.nodeSize;
      const tower = { x: x, y: this.height - maxHeight, width: this.nodeSize, height: maxHeight, priority: x * maxHeight};
      this.towers.push(tower);
    }
    this.renderTowers();
  }

  setImage(image) {
    this.targetImage = image;
    this.renderImage();
  }

  visitCell(node) {
    if (this.targetImage) {
      this.context.clearRect(node.x, node.y, this.nodeSize-1, this.nodeSize-1);
    } else {
      this.context.fillStyle = this.getColor();
      this.context.fillRect(node.x, node.y, this.nodeSize-1, this.nodeSize-1);
    }
  }

  // Update the component state algorithmName and the DOM element
  updateAlgorithmName(name) {
    let targetAlgorithm;
    for (const algorithm of algorithmData) {
      if (algorithm['name'] === name) {
        targetAlgorithm = algorithm;
        break;
      }
    }
    this.currentAlgorithmName = name;
    this.algorithmTitleElement.current.innerHTML = `${name} <span class = ${targetAlgorithm.speed}-speed>${targetAlgorithm.timeComplexity}</span>`
    this.sorting = targetAlgorithm.sorting;
  }

  // Returns the current color
  getColor() {
    return `rgb(${this.nodeColors.r}, ${this.nodeColors.g}, ${this.nodeColors.b})`
  }

  // Slider change event handler
  updateColor = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.nodeColors[name] = value;
    if (this.sorting) {
      this.renderTowers();
    }
  }

  // Formats the current timer correctly
  formatTime() {
    return `${ this.state.minutes } : ${ (this.state.seconds < 10) ? "0" + this.state.seconds : this.state.seconds}`
  }

  getMousePosition(clientX, clientY) {
    return {mouseX: clientX - this.canvas.current.getBoundingClientRect().x,
    mouseY: clientY - this.canvas.current.getBoundingClientRect().y};
  }

  handleMouseDown = (event) => {
    if (this.runningAlgorithm) return;

    const { mouseX, mouseY } = this.getMousePosition(event.clientX, event.clientY);
    const padding = 20;

    if (mouseX >= this.startNode.x - padding && mouseX <= this.startNode.x + padding) {
        if (mouseY >= this.startNode.y - padding && mouseY <= this.startNode.y + padding) {
            this.isDragging = true;
            this.draggingNode = this.startNode;
        }
    } else if (mouseX >= this.endNode.x - padding && mouseX <= this.endNode.x + padding) {
        if (mouseY >= this.endNode.y - padding && mouseY <= this.endNode.y + padding) {
            this.isDragging = true;
            this.draggingNode = this.endNode;
        }
    }
}
  // When the mouse moves and is draging move the icons
  handleMouseMove = (event) => {
    if (this.isDragging) {
      const { mouseX, mouseY } = this.getMousePosition(event.clientX, event.clientY);

      this.draggingNode.x = mouseX - (mouseX % this.nodeSize);
      this.draggingNode.y = mouseY - (mouseY % this.nodeSize);
      this.clear();
    }
  }
  handleMouseUp = () => {
      this.isDragging = false;
      this.draggingNode = null;
  }

  render() {
    return (
      <div>
        <Navigation canvas={this}/>
        <Carousel canvas={this}/>

        <div id='canvas-wrapper'>

          <p className='help-msg'>
            Tip: Drag the Icons to change start and target points.
            <span ref={  this.finishedMessage } > Algorithm Finished.</span>
          </p>

          <div id='tools-help'>
            <p id='algorithm-title' ref={ this.algorithmTitleElement }>
              Breadth-first<span className='slow-speed'>O(|V| + |E|)</span>
            </p>

            <p className='time'>Time: <span id='time-count'>{ this.formatTime() }</span></p>

            <p className='nodes'>Nodes <span id='node-count' ref = { this.nodeCountElement }>{ this.state.nodes }</span></p>

            <div className='help-icons'>
              <p>Start <i className='fa fa-female'></i></p>
              <p>Target <i className='fa fa-bullseye'></i></p>
            </div>

            <div className='slidecontainer' id='slider-container'>
              <span>r</span><input type='range' min='0' max='225' name='r' onChange = { this.updateColor }/>
              <span>g</span><input type='range' min='0' max='200' name='g' onChange = { this.updateColor }/>
              <span>b</span><input type='range' min='0' max='225' name='b' onChange = { this.updateColor }/>
            </div>
          </div>

          <canvas
            id='canvas'
            ref={ this.canvas }
            width= { this.width }
            height= { this.height }
            onMouseDown = {this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          ></canvas>

          <canvas
            ref={ this.layeredCanvas }
            id='layered-canvas'
            width= { this.width }
            height= { this.height }
          ></canvas>

        </div>
      </div>
    );
  }
}
export default Canvas;
























































