import Algorithm from "./Algorithm";

class QuickSort extends Algorithm {

  createMutableArray(array) {
    const mutableArray = JSON.parse(JSON.stringify(array))

    return mutableArray
  }
  
   async _sort(array, canvas) {
     let mutableArray
     if(!mutableArray) mutableArray = this.createMutableArray(array)
     if (array.length <= 1) {return array}

    const mutablePivot = mutableArray[0]
    const mutableLeft = []
    const mutableRight = []
    
    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      const tower = array[i];
      const MutableTower = JSON.parse(JSON.stringify(array[i]))

      if (tower.height < pivot.height) {

        left.push(tower);
        mutableLeft.push(MutableTower)
      } else {
        right.push(tower);
        mutableRight.push(MutableTower)
      }
      await this.sleep(1)

      const mutatedTowers = mutableLeft.concat(mutablePivot).concat(mutableRight);

      for( const immutableTower of array ){
        const foundTower = mutatedTowers.find(tower => {
          return immutableTower.x == tower.x
        })
        if (!foundTower) tempTowers.push(immutableTower)
      }
      mutatedTowers.push(...tempTowers)
      console.log('mutated', mutatedTowers, 'temp', tempTowers)

      canvas.renderMutatedTowers(mutatedTowers)
      //swap x values b/t lesser and greater towers until we are done.
    
    }
    // recursion
    return this._sort(left).concat(pivot)
    .concat(this._sort(right));
  }

}
export default QuickSort;