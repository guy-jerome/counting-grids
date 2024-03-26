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
});
