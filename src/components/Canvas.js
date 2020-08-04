import React, {  useState, useRef, useEffect } from 'react';
import endIcon from '../images/bullseye.png';
import startIcon from '../images/female-solid.png';

import Navigation from './Navigation';
import Carousel from './Carousel';
import BFS from './BFS';
import DFS from './DFS';
import Merge from './Merge';
import QuickSort from './QuickSort';

const Canvas = () => {

    
    // Set our re-render properties
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [nodes, setNodes] = useState(0);
    const [runningAlgorithm, setRunningAlgorithm] = useState(false);
    const [startNode] = useState({ x:400, y:150 });
    const [endNode] = useState({ x:300, y:150 });
    const [currentAlgorithm, setCurrentAlgorithm] = useState(null);
    const [currentAlgorithmName, setCurrentAlgorithmName] = useState("Breadth-first");
    const [sorting, setSorting] = useState(false);
    const [timer, setTimer] = useState(null);
    const [targetImage, setTargetImage] = useState(null);
    
    // Other static properties
    const startNodeIcon = new Image();
    startNodeIcon.src = startIcon;
    const endNodeIcon = new Image();
    endNodeIcon.src = endIcon;

    const towers = [];
    const size = 5;

    let isDragging = false;
    let draggingNode = null;

    const canvas = useRef();
    const context = useRef();
    const layeredCanvas = useRef();
    const layeredContext = useRef();
    const width = useRef();
    const height = useRef();
    const algorithmTitleElement = useRef();
    const finishedMessage = useRef(); 

    // Component Did Mount Once (Might need to fix this)
    useEffect(() => {
        context.current = canvas.current.getContext('2d');
        layeredContext.current = layeredCanvas.current.getContext('2d');
        width.current = canvas.current.width;
        height.current = canvas.current.height;

        renderTargets();
        
    }, []);

    useEffect(() => {
        if (sorting) {
            setTowers();
        } else {
            renderTargets();
        }
    }, [sorting])

    useEffect(() => {
        clear();
        renderImage()
    }, [targetImage])

    const start = async () => {
        clear();
        setRunningAlgorithm(true);
        // Check which algorithm we're running
        let targetAlgorithm = null;
        switch(currentAlgorithmName) {
            case 'Breadth-first':
                targetAlgorithm = new BFS({width: width.current, height: height.current, visitCell: visitCell});
                break;
            case 'Depth-first':
                targetAlgorithm = new DFS({width: width.current, height: height.current, visitCell: visitCell});
                break;
            case 'Merge Sort':
                targetAlgorithm = new Merge();
                break;
            case 'Quick Sort':
                targetAlgorithm = new QuickSort();
                break;
            default:
                break;
        }
        setCurrentAlgorithm(targetAlgorithm);
        const newTimer = setInterval(tick, 1000);
        setTimer(newTimer);

        if (sorting) {
            return targetAlgorithm._sort(towers, {renderTower: renderTower, renderTowers: renderTowers}).then((data) => {
                clearInterval(newTimer)
                finishedMessage.current.style.display = "inline-block";
                stop();
                return data;
            })
        } else {
            // Return a promise indicating when the algorithm finishes
            return targetAlgorithm.start(startNode, endNode).then((data) => {
                clearInterval(newTimer)
                finishedMessage.current.style.display = "inline-block";
                stop();
                return data;
            })
        }
    }

    const getRunningAlgorithm = () => {
        return runningAlgorithm
    }

    const stop = () => {
        clearInterval(timer);
        setRunningAlgorithm(false);
        currentAlgorithm.stop = true;
    }

    const getColor = () => {
        // React drove me to this
        const slider = document.getElementById('slider-container');
        return `rgb(${slider.querySelector('input[name="red"]').value},${slider.querySelector('input[name="green"]').value},
        ${slider.querySelector('input[name="blue"]').value})`
    }

    // Render the start and end node icons
    const renderTargets = () => {
        context.current.fillStyle = "white"
        context.current.fillRect(0, 0, width.current, height.current);
        context.current.drawImage(startNodeIcon, startNode.x, startNode.y, 8, 16);
        context.current.drawImage(endNodeIcon, endNode.x, endNode.y, size, size);
    }

    const setTowers = () => {
        towers.length = 0; // Empty current towers
        for(let i = 0; i < width.current / size; i++) {
            const maxHeight = Math.floor(Math.random() * (height.current - 50) + 50);
            const tower = {x: i * size, y: height.current - maxHeight, width: size, height: maxHeight};
            towers.push(tower);
        }
        renderTowers();
    }
    
    // Highlights a single cell in the canvas
    const visitCell = (node) => {
        if (!targetImage) {
            context.current.fillStyle = getColor();
            context.current.fillRect(node.x, node.y, size - 1, size - 1);
        } else {
            context.current.clearRect(node.x, node.y, size - 1, size - 1);
        }
    }
    
    // Renders a single tower
    const renderTower = (tower, newColor = "red") => {
        context.current.fillStyle = newColor;
        context.current.fillRect(tower.x, tower.y, tower.width - 1, tower.height - 1);
    }

    // Draws onto the canvas all the towers in the towers array
    const renderTowers = () => {
        context.current.fillStyle = "white"
        context.current.fillRect(0, 0, width.current, height.current);
        for (const tower of towers) {
            if (!targetImage) {
                context.current.fillStyle = getColor();
                context.current.fillRect(tower.x, tower.y, tower.width - 1, tower.height - 1);
            } else {
                context.current.clearRect(tower.x, tower.y, tower.width - 1, tower.height - 1);
            }
        }
      }

    // Clean the canvas and reset visuals
    const clear = () => {
        if (runningAlgorithm) { return; }
        context.current.fillStyle = 'white';
        context.current.fillRect(0, 0, width.current, height.current);

        setNodes(0);
        setSeconds(0);
        setMinutes(0);

        document.getElementById('node-count').innerHTML = 0;
        finishedMessage.current.style.display = ''

        if (sorting) {
            setTowers();
        } else {
            renderTargets();
        }
    }

    // Keeps track of running time
    const tick = () => {
        setSeconds(prevSeconds => prevSeconds + 1);
        if (seconds + 1 >= 60) {
            setSeconds(0);
            setMinutes(minutes + 1);
        }
    }

    // Creating drag and drop logic
    const getMousePosition = (clientX, clientY) => {
        return {mouseX: clientX - canvas.current.getBoundingClientRect().x,
        mouseY: clientY - canvas.current.getBoundingClientRect().y};
      }
    const handleMouseDown = (event) => {
        if (runningAlgorithm) { return; }

        const { mouseX, mouseY } = getMousePosition(event.clientX, event.clientY);
        const padding = 20;

        if (mouseX >= startNode.x - padding && mouseX <= startNode.x + padding) {
            if (mouseY >= startNode.y - padding && mouseY <= startNode.y + padding) {
                isDragging = true;
                draggingNode = startNode;
            }
        } else if (mouseX >= endNode.x - padding && mouseX <= endNode.x + padding) {
            if (mouseY >= endNode.y - padding && mouseY <= endNode.y + padding) {
                isDragging = true;
                draggingNode = endNode;
            }
        }
    }
    const handleMouseMove = (event) => {
        if (!isDragging) { return; }
        const { mouseX, mouseY } = getMousePosition(event.clientX, event.clientY);

        draggingNode.x = mouseX - (mouseX % size);
        draggingNode.y = mouseY - (mouseY % size);
        clear();
    }
    const handleMouseUp = () => {
        isDragging = false;
        draggingNode = null;
    }
    //----------------------------END OF Drag and Drop
    const updateAlgorithmName = (name) => {
        console.log(name);
        setCurrentAlgorithmName(name);
        switch (name) {
          case 'Breadth-first':
            algorithmTitleElement.current.innerHTML = 'Breadth-first<span class = "slow-speed">O(|V| + |E|)</span>'
            break;
          case 'Depth-first':
            algorithmTitleElement.current.innerHTML = 'Depth-first<span class = "medium-speed">O(|V| + |E|)</span>'
            break;
          case 'Merge Sort':
            algorithmTitleElement.current.innerHTML = 'Merge Sort<span class = "slow-speed">O(n log(n))</span>'
            break;
  
          case 'Quick Sort':
            algorithmTitleElement.current.innerHTML = 'Quick Sort<span class = "good-speed">O(n<sup>2</sup>)</span>'
            break;

          default:
        }
        setSorting(name === 'Quick Sort' || name === 'Merge Sort');
    }

    const setImage = (image) => {
        setTargetImage(image)
    }

    const renderImage = () => {
        if (targetImage) {
            layeredContext.current.drawImage(targetImage, 0, 0, width.current, height.current) 
        }
    }

    return (
      <div>
        <Navigation
          canvas={{
            updateAlgorithmName: updateAlgorithmName,
            clear: clear,
            stop: stop,
            start: start,
            runningAlgorithm: runningAlgorithm,
          }}
        />
        <Carousel
          canvas={{
            setImage: setImage,
            targetImage: targetImage,
            clear: clear,
            getRunningAlgorithm: getRunningAlgorithm,
          }}
        />
        <div id='canvas-wrapper'>
          <p className='help-msg'>
            Tip: Drag the Icons to change start and target points.
            <span ref={finishedMessage} > Algorithm Finished.</span>
          </p>
          <div id='tools-help'>
            <p id='algorithm-title' ref={algorithmTitleElement}>
              Breadth-first<span className='slow-speed'>O(|V| + |E|)</span>
            </p>
            <p className='time'>
              Time:{" "}
              <span id='time-count'>{`${minutes}:${
                seconds < 10 ? "0" + seconds : seconds
              }`}</span>
            </p>
            <p className='nodes'>
              Nodes <span id='node-count'>{nodes}</span>
            </p>

            <div className='help-icons'>
              <p>
                Start <i className='fa fa-female'></i>
              </p>
              <p>
                Target <i className='fa fa-bullseye'></i>
              </p>
            </div>
            <div className='slidecontainer' id='slider-container'>
              <span>r</span>
              <input type='range' min='0' max='225' name='red' />
              <span>g</span>
              <input type='range' min='0' max='200' name='green' />
              <span>b</span>
              <input type='range' min='0' max='225' name='blue' />
            </div>
          </div>
          <canvas
            id='canvas'
            ref={canvas}
            width='800'
            height='400'
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></canvas>
          <canvas
            ref={layeredCanvas}
            id='layered-canvas'
            width='800'
            height='400'
          ></canvas>
        </div>
      </div>
    );
}

export default Canvas;