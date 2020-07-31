import Algorithm from "./Algorithm";

class Merge extends Algorithm {
  _sort(array, canvas) {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.merge(
      this._sort(left, canvas),
      this._sort(right, canvas),
      canvas
    );
  }

  merge(left, right, canvas) {
    let result = [],
      leftIndex = 0,
      rightIndex = 0;

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

    this.sortTowers(left, right, canvas);
    this.sortTowers(result, result, canvas);
    this.sortTowers(right, left, canvas);
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  swapPositions(towerA, towerB) {
    const x = towerA.x;
    towerA.x = towerB.x;
    towerB.x = x;
  }

  async sortTowers(leftTowers, rightTowers, canvas) {
    for (const towerA of leftTowers) {
      await this.sleep(40);
      canvas.renderTowers();
      for (const towerB of rightTowers) {
        canvas.renderTower(towerA, "green");

        if (towerA.height < towerB.height && towerA.x > towerB.x) {
          this.swapPositions(towerA, towerB);
        }
        if (towerA.height > towerB.height && towerA.x < towerB.x) {
          this.swapPositions(towerA, towerB);
        }
      }
    }
  }
}
export default Merge;