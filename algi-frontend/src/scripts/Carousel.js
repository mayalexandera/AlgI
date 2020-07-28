import vincentImage1 from '../assets/images/vincent-01.jpg';
import vincentImage2 from '../assets/images/vincent-02.jpg';
import vincentImage3 from '../assets/images/vincent-03.jpg';
import vincentImage4 from '../assets/images/vincent-04.jpg';

class Carousel {
    constructor() {
        this.images = [vincentImage1, vincentImage2, vincentImage3, vincentImage4];
        this.imageCount = this.images.length;
        this.imageContainer = document.getElementById('image-container');
    }

    loadImages() {
        for (const image of this.images) {
            const imageElement = document.createElement('img');
            imageElement.classList.add('image-box');
            imageElement.src = image;
            this.imageContainer.appendChild(imageElement);
          }
    }
}

export default Carousel;