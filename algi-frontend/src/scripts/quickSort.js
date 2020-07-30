import Algorithm from "./Algorithm";

class QuickSort extends Algorithm {
  _sort(array, canvas) {
    if (array.length <= 1) {
      return array;
    }
    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      const tower = array[i];
      if (tower.height < pivot.height) {
        left.push(tower);
      } else {
        right.push(tower);
      }
    }
    // recurssion
    return this._sort(left).concat(pivot)
    .concat(this._sort(right));
  }

}
export default QuickSort;