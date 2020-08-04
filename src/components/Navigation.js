import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    // Sets the initial component state
    this.state = { currentAlgorithm: "Breadth-first" };
    this.dropDownElement = React.createRef();
  }

  // Toggle the dropdown element
  showDropdown = () => {
    this.dropDownElement.current.classList.remove('hidden');
  }
  hideDropDown = () => {
    this.dropDownElement.current.classList.add('hidden');
  }

  // Switch the currently selected algorihtm
  switchAlgorithm = (event) => {
    const target = event.target;
    const algorithmName = target.dataset.name;

    if (!target || !algorithmName) return;

    // Update current algorithm name
    this.setState({ currentAlgorithm: algorithmName });

    // Clear the canvas
    this.props.canvas.updateAlgorithmName(algorithmName);
    this.props.canvas.clear();
    
    // Clear all active links
    document.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });
    target.classList.add('active');
  }

  // Handles the styling of the run button and the play icon
  toggleRunButton(target) {
    let playIcon, button;

    if (target.nodeName === 'I') {
      playIcon = target;
      button = target.parentNode;
    } else {
      playIcon = target.children[0];
      button = target;
    }
    // Update their styling
    playIcon.classList = (playIcon.matches('.fa-stop') ? 'fa fa-play' : 'fa fa-stop');
    button.classList.toggle('warning');
  }

  startAlgorithm = (event) => {
    const target = event.target;
    this.toggleRunButton(target);

    // If the algorithm is currently running stop it, else play it
    if (this.props.canvas.runningAlgorithm) {
      this.props.canvas.stop();

    } else {
      // Start the algorithm and when you're done make the changes
      this.props.canvas.start().then(() => {
        this.toggleRunButton();
      })
    }
  }

  render() {
    return (
      <nav onMouseLeave = { this.hideDropDown }>
        <div className = "logo"><h1>Algorithm Imager</h1></div>
        <ul>
          <li className ="expandable" onClick = { this.showDropdown }>
            Algorithms<i className ="fa fa-arrow-down" aria-hidden="true"></i>

            <div className = "dropdown hidden" onClick = { this.switchAlgorithm } ref = {this.dropDownElement} >
              <span className ="active" data-name = "Breadth-first">BFS</span>
              <span data-name = "Depth-first" >DFS</span>
              <span data-name = "Merge Sort">Merge Sort</span>
              <span data-name = "Quick Sort">Quick Sort</span>
            </div>

          </li>
          <li id="run-button" onClick = { this.startAlgorithm }>
            Run { this.state.currentAlgorithm }<i className ="fa fa-play" aria-hidden="true"></i>
          </li>
          <li id="clear-results" onClick = {() => {this.props.canvas.clear()} }>Clear Results</li>
        </ul>
      </nav>
    )
  }
}

export default Navigation;
