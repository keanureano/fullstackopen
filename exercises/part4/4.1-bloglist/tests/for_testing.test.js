const reverse = require("../utils/for_testing").reverse;
const average = require("../utils/for_testing").average;

describe("reverse", () => {
  test("of a", () => {
    expect(reverse("a")).toBe("a");
  });

  test("of react", () => {
    expect(reverse("react")).toBe("tcaer");
  });

  test("of releveler", () => {
    expect(reverse("releveler")).toBe("releveler");
  });
});

describe("average", () => {
  test("of one value is the value itself", () => {
    expect(average([1])).toBe(1);
  });

  test("of many is calculated right", () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test("of empty array is zero", () => {
    expect(average([])).toBe(0);
  });
});
