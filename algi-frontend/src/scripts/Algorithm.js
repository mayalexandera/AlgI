class Algorithm {
    constructor() {
        console.log("Created a new class instance.");

        const testElement = document.createElement('h2');
        testElement.textContent = "SCSS TEST";
        document.getElementsByTagName('body')[0].appendChild(testElement);

    }
}

export default Algorithm;