import Algorithm from "./Algorithm";

class Merge extends Algorithm {
  async _sort(array, canvas) {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.merge(await this._sort(left, canvas), await this._sort(right, canvas), canvas);
  }

  async merge(left, right, canvas) {
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

    await this.sortTowers(left, left, canvas);
    await this.sortTowers(left, right, canvas);
    await this.sortTowers(right, right, canvas);
    await this.sortTowers(result, result, canvas);

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  swapPositions(towerA, towerB) {
    const x = towerA.x;
    towerA.x = towerB.x;
    towerB.x = x;
  }

  async sortTowers(leftTowers, rightTowers, canvas) {
    for (const towerA of leftTowers) {
      if (this.stop) {throw new Error("Stopped")}
      await this.sleep(0);
      this.nodeCountElement.textContent = parseInt(this.nodeCountElement.textContent, 10) + 1;
      canvas.renderTowers();
      for (const towerB of rightTowers) {
        canvas.renderTower(towerA, "red");

        if ((towerA.height < towerB.height && towerA.x > towerB.x) || (towerA.height >= towerB.height && towerA.x < towerB.x)) {
          this.swapPositions(towerA, towerB);
        }
      }
    }
  }
}
export default Merge;