// Task: Given a 2D array, an (n) distance, and an array of [x,y] positive cell arrays
// Print out how many positive neighboring cells are found within the manhattan distance threshhold of the original positive cells.
// example: X is the original positive cell. 0 = negative; 1 = positive. n = 2; There are 13 positive cells - 12 neighbors (1), 1 original (X)
// 0 0 1 0 0
// 0 1 1 1 0
// 1 1 X 1 1
// 0 1 1 1 0
// 0 0 1 0 0

// Hint: Manhattan distance: [x1 - x2] + [y1 - y2]

// Refer back to the grid cell neighborhood PDF for more details, assumptions, and examples
// Please do not hesistate to reach out with an questions!

// Parameters
// collXCount: number - number of columns
// rowYCount: number - number of rows
// n: number - distance threshold
// positiveCellsXYArray: Array<Array>> - array of [x,y] arrays. Ex: [[1,3], [5,5], [5,8]]
function main(collXCount, rowYCount, n, positiveCellsXYArray) {
  var count = 0;

  // *** Implement this function ***

  console.log("total count of positive cells is: ", count);
}

// *** General test cases - feel free to expand and add more (we will be adding more when testing your code) ***
main(10, 10, 3, [[5, 5]]); //will return 25
main(10, 10, 2, [
  [7, 3],
  [3, 7],
]); //will return 26
main(10, 10, 3, [[2, 2]]); //will return 23
