import React, { useState, useEffect} from 'react';

const Navigation = (props) => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState("Breadth-first");
  const [runningAlgorithm, setRunningAlgorithm] = useState(false);

  useEffect(() => {
    console.log("Effect", runningAlgorithm);
    console.log("Mounted");
  })

  // Toggles the dropdown element when clicked
  const showDropdown = (event) => {
    const dropdown = event.target.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }

  // When a user clicks on a new algorithm update the nav
  const switchAlgorithm = (event) => {
    if (runningAlgorithm) { return; }
    const algorithmName = event.target.dataset.name;

    if (algorithmName) {
      setCurrentAlgorithm(algorithmName);
      props.canvas.updateAlgorithmName(algorithmName);

      // Remove all other active algorithms classes
      document.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
      });
      event.target.classList.add('active');
    }
  }

  const hideDropDown = () => {
    document.querySelector('.dropdown').classList.add('hidden');
  }

  const startAlgorithm = (event) => {
    const target = event.target;
    toggleRunButton(target);

    setRunningAlgorithm(true);
    console.log(runningAlgorithm);
    props.canvas.clear();

    if (runningAlgorithm) {
      props.canvas.start().finally(function() {
        toggleRunButton(target);
        setRunningAlgorithm(false);
      }).catch(()=>{});
    } else {
      toggleRunButton(target);
      props.canvas.stop();
    }
  }

  const toggleRunButton = (target) => {
    const child = (target.nodeName !== 'I') ? target.children[0] : target;
    child.classList = child.matches('.fa-stop') ? 'fa fa-play' : 'fa fa-stop';
    if (target.nodeName === 'I') {
      target.parentNode.classList.toggle('warning');
    } else {
      target.classList.toggle('warning');
    }
  }

  const clearCanvas = () => {
    props.canvas.clear();
  }

  return (
    <nav onMouseLeave = { hideDropDown }>
      <div className = "logo"><h1>Algorithm Imager</h1></div>
      <ul>
        <li className ="expandable" onClick = { showDropdown }>
          Algorithms<i className ="fa fa-arrow-down" aria-hidden="true"></i>
          <div className = "dropdown hidden" onClick = { switchAlgorithm }>
            <span className ="active" data-name = "Breadth-first">BFS</span>
            <span data-name = "Depth-first" >DFS</span>
            <span data-name = "Merge Sort">Merge Sort</span>
            <span data-name = "Quick Sort">Quick Sort</span>
          </div>
        </li>
        <li id="run-button" onClick = {(event) => {startAlgorithm(event)} }>
          Run { currentAlgorithm }<i className ="fa fa-play" aria-hidden="true"></i>
        </li>
        <li id="clear-results" onClick = { clearCanvas }>Clear Results</li>
      </ul>
    </nav>
  )
}

export default Navigation;
