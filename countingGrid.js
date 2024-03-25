// Calculates the Manhattan distance between two points given as arrays [x, y]
function getManhattanDistance(XYArray1, XYArray2) {
  return (
    Math.abs(XYArray1[0] - XYArray2[0]) + Math.abs(XYArray1[1] - XYArray2[1])
  );
}

// Checks if the Manhattan distance between two points is less than or equal to n
function checkInRange(XYArray1, XYArray2, n) {
  const distance = getManhattanDistance(XYArray1, XYArray2);
  return distance <= n ? true : false;
}

// Represents a matrix with methods for manipulation and checking
class Matrix {
  constructor(collXCount, rowYCount, defaultValue = 0) {
    this.collXCount = collXCount;
    this.rowYCount = rowYCount;
    this.defaultValue = defaultValue;
    this.matrix = [];
    // Generates the Matrix
    for (let i = 0; i < this.collXCount; i++) {
      let column = [];
      for (let j = 0; j < this.rowYCount; j++) {
        column.push(defaultValue);
      }
      this.matrix.push(column);
    }
  }

  // Prints the matrix to the console
  printMatrix() {
    for (let col = 0; col < this.collXCount; col++) {
      let rowData = [];
      for (let row = 0; row < this.rowYCount; row++) {
        rowData.push(this.matrix[row][col]);
      }
      console.log(rowData.join());
    }
  }

  // Returns the count of positive values in the matrix
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

  // Sets a cell in the matrix to a positive value
  setCellToPositive(XYArray) {
    this.matrix[XYArray[0]][XYArray[1]] = 1;
  }

  // Checks if a given cell is inside the matrix
  checkIfInside(XYArray) {
    if (XYArray[0] < 0 || XYArray[0] >= this.collXCount) {
      return false;
    } else if (XYArray[1] < 0 || XYArray[1] >= this.rowYCount) {
      return false;
    }
    return true;
  }

  // Applies the brute-force positive cell filling algorithm to the matrix
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

  // Applies the adjacent walk positive cell filling algorithm to the matrix
  adjacentWalkCheck(positiveCellsXYArray, n) {
    for (let array of positiveCellsXYArray) {
      this.setCellToPositive(array);
      let activeCells = [];
      activeCells.push(array);
      let nextCells = [];
      const directions = [
        [1, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
      ];
      for (let i = 0; i < n; i++) {
        for (let cell of activeCells) {
          for (let dir of directions) {
            if (
              this.checkIfInside([cell[0] + dir[0], cell[1] + dir[1]]) &&
              this.matrix[cell[0] + dir[0]][cell[1] + dir[1]] === 0
            ) {
              this.setCellToPositive([cell[0] + dir[0], cell[1] + dir[1]]);
              nextCells.push([cell[0] + dir[0], cell[1] + dir[1]]);
            }
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

// Main function to run the algorithm
function main(collXCount, rowYCount, n, positiveCellsXYArray) {
  // Parameters
  // collXCount: number - number of columns
  // rowYCount: number - number of rows
  // n: number - distance threshold
  // positiveCellsXYArray: Array<Array>> - array of [x,y] arrays. Ex: [[1,3], [5,5], [5,8]]
  const grid = new Matrix(collXCount, rowYCount);
  grid.adjacentWalkCheck(positiveCellsXYArray, n);
  grid.printMatrix();
  return grid.getPositive();
}

// Example usage
main(10, 10, 3, [[5, 5]]); //will return 25
main(10, 10, 2, [
  [7, 3],
  [3, 7],
]); //will return 26
main(10, 10, 3, [[2, 2]]); //will return 23

module.exports = main;
