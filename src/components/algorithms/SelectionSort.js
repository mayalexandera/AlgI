import Algorithm from "./Algorithm";

class SelectionSort extends Algorithm {

    async _sort(towers) {
        let smallestTower = towers[0]
        let towerIndex = 0;
        let currentIndex = 0;

        while (currentIndex < towers.length) {
            for (let i = currentIndex; i < towers.length; i++) {
                const tower = towers[i];
                if (tower.height <= smallestTower.height) {
                    smallestTower = tower;
                    towerIndex = i;
                }
            }

            if (this.stop) return towers;

            await this.sleep(50);
            this.canvas.renderTowers();

            const removedTower = towers[currentIndex];
            towers[currentIndex] = smallestTower;
            towers[towerIndex] = removedTower

            removedTower.x = towerIndex * this.canvas.nodeSize;
            smallestTower.x = currentIndex * this.canvas.nodeSize;
            this.canvas.renderTower(smallestTower, "green");
            smallestTower = towers[++currentIndex];
        }
    }    
}
export default SelectionSort;