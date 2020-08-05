class Algorithm {
    constructor(canvas) {
        this.nodeCountElement = document.getElementById('node-count');
        this.canvas = canvas;
        this.stop = false;
        this.size = canvas.nodeSize;
        if (this.canvas.sorting) {
            this.nodeCountElement.textContent = 160;
        }
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    swapPositions(towerA, towerB) {
        const x = towerA.x;
        towerA.x = towerB.x;
        towerB.x = x;
    }

    async sortTowers(leftTowers, rightTowers) {
        for (const towerA of leftTowers) {
          if (this.stop) {throw new Error("Stopped")}
          await this.sleep(0);
    
          this.canvas.renderTowers();
          for (const towerB of rightTowers) {
            this.canvas.renderTower(towerA, "red");
    
            if ((towerA.height < towerB.height && towerA.x > towerB.x) || (towerA.height >= towerB.height && towerA.x < towerB.x)) {
              this.swapPositions(towerA, towerB);
            }
          }
        }
      }

    withinBounds(position) {
        return (
          position.x >= 0 &&
          position.x < this.canvas.width &&
          position.y >= 0 &&
          position.y < this.canvas.height
        );
    }
}

export default Algorithm;
