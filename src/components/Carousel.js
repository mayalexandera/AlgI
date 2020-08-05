import React from 'react';

import vincentImage0 from '../images/vincent.jpg';
import vincentImage1 from '../images/vincent-01.jpg';
import vincentImage2 from '../images/vincent-02.jpg';
import vincentImage3 from '../images/vincent-03.jpg';
import vincentImage4 from '../images/vincent-04.jpg';

import picasoImage1 from '../images/picaso-01.jpg';
import picasoImage2 from '../images/picaso-02.jpg';
import picasoImage3 from '../images/picaso-03.jpg';
import picasoImage4 from '../images/picaso-04.jpg';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.images = [vincentImage1, vincentImage2, vincentImage3, vincentImage4, picasoImage1, picasoImage2, picasoImage3, picasoImage4, vincentImage0];
    this.maxRange = 4;
    this.currentRange = 0;
    this.imageContainer = React.createRef();
    this.imageElements = [];
  }

  componentDidMount() {
    this.createImages();
    this.loadImages();
  }

  // Converts all the imported images into HTMLElements and pushes them into an array
  createImages() {
    for(const image of this.images) {
      const imageElement = document.createElement('img');
      imageElement.classList.add('image-box');
      imageElement.src = image;
      this.imageElements.push(imageElement);
    }
  }

  // Slices off a section of image elements and returns them
  getCurrentImages() {
    return this.imageElements.slice(this.currentRange, this.currentRange + this.maxRange);
  }

  // Clean out the image container and add the new images
  loadImages() {
    this.imageContainer.current.innerHTML = '';
    for (const image of this.getCurrentImages()) {
        this.imageContainer.current.appendChild(image);
      }
  }

  toggleClasses(classesObject) {
    this.imageElements.forEach((element) => {
      classesObject.removes.forEach((_class) => {
        element.classList.remove(_class);
      })
      classesObject.adds.forEach((_class) => {
        element.classList.add(_class);
      })
    })
  }

  // Depending on the direction the user clicks update the list of images
  handleArrowsClick(target) {
    const swipingRight = target.matches('.right');
    const swipingLeft = target.matches('.left');

    if (swipingRight && this.currentRange < this.images.length - this.maxRange) {
      this.currentRange += 1;
    }
    if (swipingLeft && this.currentRange > 0) {
      this.currentRange -= 1;
    }

    if (swipingLeft || swipingRight) {
      this.loadImages();
    }
  }

  // When a user clicks on an image update its styling
  handleClick = (event) => {
    const target = event.target;
    this.handleArrowsClick(target);

    if (target.nodeName === 'IMG') {
      // Toggle the image classes
      this.toggleClasses({adds: ['faded'], removes: ['selected']});

      // If the user clicks on the same image twice turn everything off
      if (this.props.canvas.targetImage === target) {
        this.toggleClasses({removes: ['faded'], adds: []});
        this.props.canvas.setImage(null);

      } else {
        this.props.canvas.setImage(target);
        target.classList.remove('faded');
        target.classList.add('selected');
      }
      this.props.canvas.clear();
    }
  }


  render() {
    return (
      <div>
        <div className = "divider"></div>
        <h2>Pick an Image</h2>
        <p className = "help-tip">Toggle the images to change visual effects.</p>

        <div id="image-wrapper" onClick={ this.handleClick }>

          <button className="left">
            <i className="fa fa-angle-left left" aria-hidden="true"></i>
          </button>
          <div id="image-container" ref={ this.imageContainer }>
          </div>

          <button className="right">
            <i className="fa fa-angle-right right" aria-hidden="true"></i>
          </button>
        </div>

      </div>
    )
  }
}

export default Carousel;
