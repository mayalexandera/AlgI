import Algorithm from "./Algorithm";

class Bubblesort extends Algorithm {
  async _sort(towers) {
    let sorted = false;

    while (!sorted) {
      sorted = true;
      for (let i = 0; i < towers.length; i++) {
        let j = i + 1;
        if (towers[i].height > towers[j].height) {
          sorted = false;
          towers[j].x = i;
          towers[i].x = j;
        }
      }
    }
  }
}

export default Bubblesort;
