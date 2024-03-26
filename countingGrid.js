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
      this.setCellToPositive(array); // Sets the initial array to positive
      for (let i = 0; i < this.rowYCount; i++) {
        for (let j = 0; j < this.collXCount; j++) {
          //Checks every cell and if the cell is in range convert it to a positive number
          if (checkInRange(array, [j, i], n)) {
            this.setCellToPositive([j, i]);
          }
        }
      }
    }
  }

  // Applies the adjacent walk positive cell filling algorithm to the matrix
  // This algorithm finds all of the positive neighbors by incrementally expanding the ring of neighbors based on the n value.
  adjacentWalkCheck(positiveCellsXYArray, n) {
    for (let array of positiveCellsXYArray) {
      this.setCellToPositive(array); // Sets the input array to a positive number
      let activeCells = [];
      activeCells.push(array); // initializes the the first array to check
      let nextCells = [];
      // These are the four directions that cells check during each step of the check
      // East, West, North, and South
      const directions = [
        [1, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
      ];
      // This iterates through each layer around the positive cell based on the n value
      for (let i = 0; i < n; i++) {
        for (let cell of activeCells) {
          for (let dir of directions) {
            // check if cell is within bounds of the matrix and is negative
            if (
              this.checkIfInside([cell[0] + dir[0], cell[1] + dir[1]]) &&
              this.matrix[cell[0] + dir[0]][cell[1] + dir[1]] === 0
            ) {
              // Set the cell to a positive value and then add it to the next layer cells to be checked.
              this.setCellToPositive([cell[0] + dir[0], cell[1] + dir[1]]);
              nextCells.push([cell[0] + dir[0], cell[1] + dir[1]]);
            }
          }
        } // If there are no more cells to convert to positive break out of the loop
        if (nextCells.length < 1) {
          break;
        }
        // Reset for next round
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
  // grid.bruteForceCheck(positiveCellsXYArray, n) //This is the more costly method that uses a brute force algorithm
  grid.adjacentWalkCheck(positiveCellsXYArray, n);
  //grid.printMatrix(); //You can print out the array if you want to see a simple visual in the console.

  return grid.getPositive();
}

// Example usage
// main(10, 10, 3, [[5, 5]]); //will return 25
// main(10, 10, 2, [
//   [7, 3],
//   [3, 7],
// ]); //will return 26
// main(10, 10, 3, [[2, 2]]); //will return 23
console.log(
  main(10, 10, 0, [
    [1, 2],
    [3, 5],
  ])
);
module.exports = main;
