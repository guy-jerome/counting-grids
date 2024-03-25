// Task: Given a 2D array, an (n) distance, and an array of [x,y] positive cell arrays
// Print out how many positive neighboring cells are found within the manhattan distance threshold of the original positive cells.
// example: X is the original positive cell. 0 = negative; 1 = positive. n = 2; There are 13 positive cells - 12 neighbors (1), 1 original (X)
// 0 0 1 0 0
// 0 1 1 1 0
// 1 1 X 1 1
// 0 1 1 1 0
// 0 0 1 0 0

// Hint: Manhattan distance: [x1 - x2] + [y1 - y2]

// Refer back to the grid cell neighborhood PDF for more details, assumptions, and examples
// Please do not hesitate to reach out with an questions!

// Parameters
// collXCount: number - number of columns
// rowYCount: number - number of rows
// n: number - distance threshold
// positiveCellsXYArray: Array<Array>> - array of [x,y] arrays. Ex: [[1,3], [5,5], [5,8]]
function getManhattanDistance(XYArray1, XYArray2) {
  return (
    Math.abs(XYArray1[0] - XYArray2[0]) + Math.abs(XYArray1[1] - XYArray2[1])
  );
}

function checkInRange(XYArray1, XYArray2, n) {
  const distance = getManhattanDistance(XYArray1, XYArray2);
  return distance <= n ? true : false;
}

class Matrix {
  constructor(collXCount, rowYCount, defaultValue = 0) {
    this.collXCount = collXCount;
    this.rowYCount = rowYCount;
    this.defaultValue = defaultValue;
    this.matrix = [];
    for (let i = 0; i < this.collXCount; i++) {
      let column = [];
      for (let j = 0; j < this.rowYCount; j++) {
        column.push(defaultValue);
      }
      this.matrix.push(column);
    }
  }
  getMatrix() {
    return this.matrix;
  }
  printMatrix() {
    const numRows = this.matrix.length;
    const numCols = this.matrix[0].length;

    for (let col = 0; col < numCols; col++) {
      let rowData = [];
      for (let row = 0; row < numRows; row++) {
        rowData.push(this.matrix[row][col]);
      }
      console.log(rowData.join());
    }
  }
  getPositive() {
    return this.matrix.reduce((count, row) => {
      return (
        count +
        row.reduce((rowCount, value) => {
          return rowCount + value;
        }, 0)
      );
    }, 0);
  }
  setCellToPositive(XYArray) {
    this.matrix[XYArray[0]][XYArray[1]] = 1;
  }
  checkIfInside(XYArray) {
    if (XYArray[0] < 0 || XYArray[0] >= this.collXCount) {
      return false;
    } else if (XYArray[1] < 0 || XYArray[1] >= this.rowYCount) {
      return false;
    }
    return true;
  }
  bruteForceCheck(positiveCellsXYArray, n) {
    for (let array of positiveCellsXYArray) {
      this.setCellToPositive(array);
      for (let i = 0; i < this.rowYCount; i++) {
        for (let j = 0; j < this.collXCount; j++) {
          if (checkInRange(array, [j, i], n)) {
            this.setCellToPositive([j, i]);
          }
        }
      }
    }
  }

  adjacentWalkCheck(positiveCellsXYArray, n) {
    for (let array of positiveCellsXYArray) {
      this.setCellToPositive(array);
      let activeCells = [];
      activeCells.push(array);
      let nextCells = [];
      for (let i = 0; i < n; i++) {
        for (let cell of activeCells) {
          //East
          if (
            this.checkIfInside([cell[0] + 1, cell[1]]) &&
            this.matrix[cell[0] + 1][cell[1]] === 0
          ) {
            this.setCellToPositive([cell[0] + 1, cell[1]]);
            nextCells.push([cell[0] + 1, cell[1]]);
          }
          //West
          if (
            this.checkIfInside([cell[0] - 1, cell[1]]) &&
            this.matrix[cell[0] - 1][cell[1]] === 0
          ) {
            this.setCellToPositive([cell[0] - 1, cell[1]]);
            nextCells.push([cell[0] - 1, cell[1]]);
          }
          //North
          if (
            this.checkIfInside([cell[0], cell[1] - 1]) &&
            this.matrix[cell[0]][cell[1] - 1] === 0
          ) {
            this.setCellToPositive([cell[0], cell[1] - 1]);
            nextCells.push([cell[0], cell[1] - 1]);
          }
          //South
          if (
            this.checkIfInside([cell[0], cell[1] + 1]) &&
            this.matrix[cell[0]][cell[1] + 1] === 0
          ) {
            this.setCellToPositive([cell[0], cell[1] + 1]);
            nextCells.push([cell[0], cell[1] + 1]);
          }
        }
        if (nextCells.length < 1) {
          break;
        }
        activeCells = nextCells;
        nextCells = [];
      }
    }
  }
}

function main(collXCount, rowYCount, n, positiveCellsXYArray) {
  const grid = new Matrix(collXCount, rowYCount);
  grid.printMatrix();

  grid.adjacentWalkCheck(positiveCellsXYArray, n);
  // grid.bruteForceCheck(positiveCellsXYArray, n);
  console.log("------------------------");
  grid.printMatrix();
  return grid.getPositive();
}

// *** General test cases - feel free to expand and add more (we will be adding more when testing your code) ***
// console.log(main(10, 10, 3, [[7, 5]])); //will return 25
// console.log(
//   main(10, 10, 2, [
//     [7, 3],
//     [3, 7],
//   ])
// ); //will return 26
// console.log(main(10, 10, 3, [[2, 2]])); //will return 23
console.log(
  main(10, 2, 2, [
    [1, 0],
    [7, 0],
  ])
);
module.exports = main;
