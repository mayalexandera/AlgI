import Algorithm from "./Algorithm";

class Merge extends Algorithm{
  _sort(array, canvas) {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.merge(this._sort(left), this._sort(right));
  }

  merge(left, right) {
    let result = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      const towerA = left[leftIndex];
      const towerB = right[rightIndex];

      if (towerA.height < towerB.height) {
        result.push(towerA);
        leftIndex++;
      } else {
        result.push(towerB);
        rightIndex++;
      }
    }
    
    return result.concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

}
export default Merge;