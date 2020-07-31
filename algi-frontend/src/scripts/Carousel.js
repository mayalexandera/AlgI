import vincentImage0 from '../assets/images/vincent.jpg';
import vincentImage1 from '../assets/images/vincent-01.jpg';
import vincentImage2 from '../assets/images/vincent-02.jpg';
import vincentImage3 from '../assets/images/vincent-03.jpg';
import vincentImage4 from '../assets/images/vincent-04.jpg';

import picasoImage1 from '../assets/images/picaso-01.jpg';
import picasoImage2 from '../assets/images/picaso-02.jpg';
import picasoImage3 from '../assets/images/picaso-03.jpg';
import picasoImage4 from '../assets/images/picaso-04.jpg';

class Carousel {
    constructor(canvas) {
        this.images = [vincentImage1, vincentImage2, vincentImage3, vincentImage4, 
            picasoImage1, picasoImage2, picasoImage3, picasoImage4, vincentImage0
        ];
        this.imageContainer = document.getElementById('image-container');
        this.imageWrapper = document.getElementById('image-wrapper');
        this.imageWrapper.addEventListener('click', this.handleClick.bind(this));
        this.imageElements = [];

        this.currentRange = 0;
        this.maxRange = 4;
        this.canvas = canvas;
        this.createImages();
    }

    createImages() {
        for(const image of this.images) {
            const imageElement = document.createElement('img');
            imageElement.classList.add('image-box');
            imageElement.src = image;
            this.imageElements.push(imageElement);
        }
    }

    getCurrentImages() {
        return this.imageElements.slice(this.currentRange, this.currentRange + this.maxRange)
    }

    handleClick(event) {
        const target = event.target;
        if (target.matches('.right') || target.matches('.fa-angle-right')) {
            if (this.currentRange >= this.images.length - this.maxRange) {return;}
            this.currentRange+=1;
            this.loadImages();
        }
        if (target.matches('.left') || target.matches('.fa-angle-left')) {
            if (this.currentRange < 1) {return;}
            this.currentRange+=-1;
            this.loadImages();
        }

        if (event.target.nodeName == 'IMG' && !this.canvas.runningAlgorithm) {
            document.querySelectorAll('.selected').forEach(element => {
                element.classList.remove('selected');
            })
            
            if (this.canvas.targetImage == event.target) {
                this.canvas.setImage(null);
            } else {
                this.canvas.setImage(event.target);
                event.target.classList.add('selected')
            }
            this.canvas.clear(this.canvas.sorting);
        }
    }

    loadImages() {
        this.imageContainer.innerHTML = "";
        for (const image of this.getCurrentImages()) {
            this.imageContainer.appendChild(image);
          }
    }
}

export default Carousel;