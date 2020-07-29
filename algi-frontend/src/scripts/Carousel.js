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
    constructor() {
        this.images = [vincentImage0, vincentImage1, vincentImage2, vincentImage3, vincentImage4, 
            picasoImage1, picasoImage2, picasoImage3, picasoImage4
        ];
        this.imageContainer = document.getElementById('image-container');
        this.imageWrapper = document.getElementById('image-wrapper');
        this.imageWrapper.addEventListener('click', this.handleClick.bind(this));

        this.currentRange = 0;
        this.maxRange = 4;
    }

    getCurrentImages() {
        return this.images.slice(this.currentRange, this.currentRange + this.maxRange)
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

        if (event.target.nodeName == 'IMG') {
            this.canvas.setImage(event.target);
            this.canvas.clear();
        }
    }

    loadImages() {
        this.imageContainer.innerHTML = "";
        for (const image of this.getCurrentImages()) {
            const imageElement = document.createElement('img');
            imageElement.classList.add('image-box');
            imageElement.src = image;
            this.imageContainer.appendChild(imageElement);
          }
    }
}

export default Carousel;