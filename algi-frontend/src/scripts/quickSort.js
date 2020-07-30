import Algorithm from "./Algorithm";

/*
update the positions of the towers while sorting them

Array 1 = muteable towers
Array 2 = unmutable towers -> Sorted in real time

mutate the towers and add the missing changes from the unmutable


unmutateblearray[00000000000000000000XXXXXXXXXXXXXXXXXXXXXXXXXX0000000000000000000000]

*/


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


/*
   return new Promise(async (resolve, reject)  => {
                const sortedTowers = this.currentAlgorithm._sort(this.canvas.towers, this.canvas);

                for (let i = 0; i < sortedTowers.length; i++) {
                    this.nodeCountElement.textContent = parseInt(this.nodeCountElement.textContent, 10) + 1;
                    if (this.currentAlgorithm.stop) {
                        break;
                    }
                    sortedTowers[i].x = (i * Canvas.size);
                    this.canvas.towers = sortedTowers;
                    this.canvas.renderTowers();
                    await this.sleep(10);
                }
                this.canvas.towers = sortedTowers;
                this.canvas.renderTowers();
                resolve("Done");
            })

*/