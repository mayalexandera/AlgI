const { default: Algorithm } = require("./Algorithm");

class BSearch extends Algorithm {
    async start(startNode, endNode) {
        const array = [...Array(1000).keys()];
        const target = 301;
        console.log(this.search(array, target, 0, array.length - 1))
    }

    search(array, index, left, right) {

        if (left > right) {
            return false;
        }

        const middle = Math.floor((left + right) / 2);

        if (middle === index) {
            return index;

        } else if (index < array[middle]) {
            return this.search(array, index, left, middle-1);
        } else {
            return this.search(array, index, middle+1, right);
        }
    }
}

export default BSearch;