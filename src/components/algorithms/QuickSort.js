import Algorithm from "./Algorithm";

class QuickSort extends Algorithm {

  async _sort(array) {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      const tower = array[i];
      tower.height < pivot.height ? left.push(tower) : right.push(tower);
    }

    const merged = array.concat(left, right);
    await this.sortTowers(merged, merged)

    return this._sort(left).then((leftArray) => {
      leftArray = leftArray.concat(pivot);
      return this._sort(right).then((rightArray) => {
        return leftArray.concat(rightArray);
      })
    })
  }
}
export default QuickSort;
