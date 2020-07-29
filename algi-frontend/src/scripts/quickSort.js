class quickSort {

  start(array) {
  // return array if it there is only one or zero elements
    if (array.length <= 1) {
      return array;
    }

    //setting the pivot point to the first element in the array
    let pivot = array[0];

    //declaring empty arrays for the left and right sides of the sorted array
    let left = [];
    let right = [];

    //iterating through the array, comparing the element at index to pivot, sending numbers with value less than pivot to the left, and the numbers whose value is more than pivot's to the right
    for (let i = 1; i < array.length; i++) {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    //returning recursively - passing in the two arrays through quicksort until both sides are sorted with the pivot in its respective position.
    return quicksort(left).concat(pivot).concat(quicksort(right));
  }

}

export default quickSort

//testing testing
//let array = [4,5,22,35,6,8,1,0,87];
//let sorted = quicksort(array);
//console.log(sorted)
