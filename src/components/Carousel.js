import React, { useState, useEffect, useRef } from 'react';

import vincentImage0 from '../images/vincent.jpg';
import vincentImage1 from '../images/vincent-01.jpg';
import vincentImage2 from '../images/vincent-02.jpg';
import vincentImage3 from '../images/vincent-03.jpg';
import vincentImage4 from '../images/vincent-04.jpg';

import picasoImage1 from '../images/picaso-01.jpg';
import picasoImage2 from '../images/picaso-02.jpg';
import picasoImage3 from '../images/picaso-03.jpg';
import picasoImage4 from '../images/picaso-04.jpg';

const Carousel = (props) => {
  const images = [vincentImage1, vincentImage2, vincentImage3, vincentImage4,
      picasoImage1, picasoImage2, picasoImage3, picasoImage4, vincentImage0
  ];
  const [imageElements] = useState([])
  const maxRange = 4;
  const imageContainer = useRef();

  const [currentRange, setCurrentRange] = useState(0);

  useEffect(() => {
    createImages();
    loadImages();
  })
  

  // Create an image element for every image src
  const createImages = () => {
    for(const image of images) {
        const imageElement = document.createElement('img');
        imageElement.classList.add('image-box');
        imageElement.src = image;
        imageElements.push(imageElement);
    }
  }
  const getCurrentImages = () => {
      return imageElements.slice(currentRange, currentRange + maxRange)
  }

  const handleClick = (event) => {
    const target = event.target;

    if (target.matches('.right') || target.matches('.fa-angle-right')) {
        if (currentRange >= images.length - maxRange) { return; }
        setCurrentRange(currentRange + 1);
        loadImages();
    }
    if (target.matches('.left') || target.matches('.fa-angle-left')) {
        if (currentRange < 1) { return; }
        setCurrentRange(currentRange - 1);
        loadImages();
    }
    // Updates the canvas current image
    if (event.target.nodeName === "IMG" && !props.canvas.getRunningAlgorithm()) {
      imageElements.forEach((element) => {
        element.classList.add("faded");
        element.classList.remove("selected");
      });
      if (props.canvas.targetImage === event.target) {
        imageElements.forEach((element) => {
          element.classList.remove("faded");
        });
        props.canvas.setImage(null);
      } else {
        props.canvas.setImage(event.target);
        event.target.classList.remove("faded");
        event.target.classList.add("selected");
      }
      props.canvas.clear();
    }
  }

  

  const loadImages = () => {
    imageContainer.current.innerHTML = '';
    for (const image of getCurrentImages()) {
        imageContainer.current.appendChild(image);
      }
  }

  return (
    <div>
      <div className = "divider"></div>
      <h2>Pick an Image</h2>
      <p className = "help-tip">Toggle the images to change visual effects.</p>
      <div id="image-wrapper" onClick = { handleClick }>
        <button className="left">
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </button>
        <div id="image-container" ref = { imageContainer }>
        </div>
        <button className="right">
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
}

export default Carousel;
