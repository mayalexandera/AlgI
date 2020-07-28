import vincentImage1 from '../assets/images/vincent-01.jpg';
import vincentImage2 from '../assets/images/vincent-02.jpg';
import vincentImage3 from '../assets/images/vincent-03.jpg';
import vincentImage4 from '../assets/images/vincent-04.jpg';

class Carousel {
    constructor() {
        this.images = [vincentImage1, vincentImage2, vincentImage3, vincentImage4];
        this.imageCount = this.images.length;
        this.imageContainer = document.getElementById('image-container');
        this.imageWrapper = document.getElementById('image-wrapper');

        this.imageWrapper.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', this.handleClick.bind(this));
        })

        this.currentRange = 0;
    }

    getCurrentImages() {
        return this.images.slice(this.currentRange, this.currentRange + 3)
    }

    handleClick(event) {
        const target = event.target;
        if (target.matches('.right') || target.matches('.fa-angle-right')) {
            this.currentRange+=1;
            this.loadImages();
        }
        if (target.matches('.left') || target.matches('.fa-angle-left')) {
            this.currentRange+=-1;
            this.loadImages();
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