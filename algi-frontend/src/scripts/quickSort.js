import Algorithm from "./Algorithm";

class QuickSort extends Algorithm{
  _sort(array) {
    if (array.length <= 1) {
      return array;
    }
    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    // recurssion
    return this._sort(left).concat(pivot)
    .concat(this._sort(right));
  }

}
export default QuickSort;