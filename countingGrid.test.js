const main = require("./countingGrid");

describe("Counting Grid Test", () => {
  test("A single positive value in the center of the grid", () => {
    expect(main(10, 10, 3, [[5, 5]])).toBe(25);
  }),
    test("Two positive value in the center of the grid overlapping", () => {
      expect(
        main(10, 10, 2, [
          [7, 3],
          [3, 7],
        ])
      ).toBe(26);
    }),
    test("A positive value on the edge of the grid", () => {
      expect(main(10, 10, 3, [[2, 2]])).toBe(23);
    }),
    test("1X10 check", () => {
      expect(main(1, 10, 2, [[0, 3]])).toBe(5);
    }),
    test("10x1 check", () => {
      expect(main(10, 1, 3, [[1, 0]])).toBe(5);
    }),
    test("A zero n value", () => {
      expect(
        main(10, 10, 0, [
          [1, 2],
          [3, 5],
        ])
      ).toBe(2);
    });
  test("Multiple positive values with overlapping neighborhoods", () => {
    expect(
      main(10, 10, 3, [
        [5, 5],
        [6, 5],
        [5, 6],
        [6, 6],
      ])
    ).toBe(40);
  });

  test("Multiple positive values directly adjacent", () => {
    expect(
      main(10, 10, 1, [
        [5, 5],
        [5, 6],
        [6, 5],
        [6, 6],
      ])
    ).toBe(12);
  });

  test("Positive values in a corner", () => {
    expect(
      main(10, 10, 2, [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ])
    ).toBe(13);
  });

  test("Oddly shaped arrays: 1x21", () => {
    expect(
      main(1, 21, 2, [
        [0, 0],
        [0, 10],
        [0, 20],
      ])
    ).toBe(11);
  });

  test("Oddly shaped arrays: 2x2", () => {
    expect(
      main(2, 2, 1, [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ])
    ).toBe(4);
  });

  test("N is much larger than the array size", () => {
    expect(main(10, 10, 100, [[5, 5]])).toBe(100);
  });

  test("Huge Area with one array", () => {
    expect(main(5000, 5000, 3, [[500, 500]])).toBe(25);
  });
});
