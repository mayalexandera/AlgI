import Algorithm from "./Algorithm";

class QuickSort extends Algorithm {

  async _sort(array, canvas) {
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
    this.sortTowers(left, right, canvas).then(() => {
      this.sortTowers(array, array, canvas);
    })
    

    await this.sleep(25);

    return await this._sort(left, canvas).then((arr) => {
      arr = arr.concat(pivot);
      return this._sort(right, canvas).then((newArray) => {
        arr = arr.concat(newArray);
        return arr;
      })
    })
  }

  swapPositions(towerA, towerB) {
    const x = towerA.x;
    towerA.x = towerB.x;
    towerB.x = x;
  }

  async sortTowers(leftTowers, rightTowers, canvas) {
    canvas.renderTowers();
    for(const towerA of leftTowers) {
      //await this.sleep(1);
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
export default QuickSort;
