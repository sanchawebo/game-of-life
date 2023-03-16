/* eslint-disable no-plusplus */
export default class GameOfLife {
  /*
  functions
      1 - create 2 2d arrays with zeros (active/inactive) - done!
      2 - fill active array randomly with ones and zeros - done!
      3 - set color for cells - done!
      4 - count neigbours
      5 - update generation
      6 - clear canvas
  */

  constructor(canvas) {
    this.cell_size = 5;
    this.dead_color = '#181818';
    this.alive_color = '#FF756B';
    this.cells_in_column = Math.floor(canvas.width / this.cell_size);
    this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
    this.active_array = [];
    this.inactive_array = [];

    this.arrayInitialization = () => {
      for (let i = 0; i < this.cells_in_rows; i++) {
        this.active_array[i] = [];
        for (let j = 0; j < this.cells_in_column; j++) {
          this.active_array[i][j] = 0;
        }
      }
      this.inactive_array = this.active_array;
    };

    this.arrayRandomize = () => {
      for (let i = 0; i < this.cells_in_rows; i++) {
        for (let j = 0; j < this.cells_in_column; j++) {
          this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0;
        }
      }
    };

    this.fillArray = (ctx) => {
      for (let i = 0; i < this.cells_in_rows; i++) {
        for (let j = 0; j < this.cells_in_column; j++) {
          let color;
          if (this.active_array[i][j] === 1) {
            color = this.alive_color;
          } else {
            color = this.dead_color;
          }
          ctx.fillStyle = color;
          ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
        }
      }
    };

    this.setCellValueHelper = (row, col) => {
      try {
        return this.active_array[row][col];
      } catch {
        return 0;
      }
    };

    this.countNeighbours = (row, col) => {
      let totalNeighbours = 0;
      totalNeighbours += this.setCellValueHelper(row - 1, col - 1);
      totalNeighbours += this.setCellValueHelper(row - 1, col);
      totalNeighbours += this.setCellValueHelper(row - 1, col + 1);
      totalNeighbours += this.setCellValueHelper(row, col - 1);
      totalNeighbours += this.setCellValueHelper(row, col + 1);
      totalNeighbours += this.setCellValueHelper(row + 1, col - 1);
      totalNeighbours += this.setCellValueHelper(row + 1, col);
      totalNeighbours += this.setCellValueHelper(row + 1, col + 1);
      return totalNeighbours;
    };

    this.updateCellValue = (row, col) => {
      const total = this.countNeighbours(row, col);
      // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
      if (total > 4 || total < 3) {
        return 0;
      }
      // dead cell with 3 neighbours becomes alive. 0 => 1
      if (this.active_array[row][col] === 0 && total === 3) {
        return 1;
      }
      // or returning its status back. 0 => 0; 1 => 1

      return this.active_array[row][col];
    };

    this.updateLifeCycle = () => {
      for (let i = 0; i < this.cells_in_rows; i++) {
        for (let j = 0; j < this.cells_in_column; j++) {
          const newState = this.updateCellValue(i, j);
          this.inactive_array[i][j] = newState;
        }
      }
      this.active_array = this.inactive_array;
    };

    this.gameSetUp = () => {
      this.arrayInitialization();
    };

    this.runGame = (ctx) => {
      this.updateLifeCycle();
      this.fillArray(ctx);
    };
  }
}
