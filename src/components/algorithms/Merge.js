import Algorithm from "./Algorithm";

class Merge extends Algorithm {
  async _sort(array) {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.merge(await this._sort(left), await this._sort(right));
  }

  async merge(left, right) {
    let result = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      const towerA = left[leftIndex];
      const towerB = right[rightIndex];

      if (towerA.height < towerB.height) {
        result.push(towerA);
        leftIndex++;

      } else if (towerA.height >= towerB.height){

        result.push(towerB);
        rightIndex++;
      }
    }

    await this.sortTowers(left, right);
    await this.sortTowers(left, left);
    await this.sortTowers(result, result);

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
}
export default Merge;