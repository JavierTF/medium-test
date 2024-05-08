import {colors} from "../utils/utils";
// import changeColor from "../utils/utils";

describe("About colors objects", () => {
  jest.mock("../utils/utils");
  test("should define colors correctly", () => {
    expect(true).toBe(true);
    expect(colors).toBeDefined();
    expect(colors).toHaveProperty("@", "rgba(55, 162, 126, 1)");
    expect(colors).toHaveProperty("#", "rgba(118, 89, 200, 1)");
    expect(colors).toHaveProperty("link", "rgba(57, 137, 225, 1)");
    expect(colors).toHaveProperty("email", "rgba(218, 175, 97, 1)");
    expect(colors).toHaveProperty("default", "rgba(0, 0, 0, 1)");
  });
});

describe.skip("About changeColor function", () => {
//   jest.mock("../utils/utils");
//   const changeColor = require("../utils/utils");
  test("should return rgba(55, 162, 126, 1) for words starting with '@'", () => {
    expect(changeColor("@username")).toEqual("rgba(55, 162, 126, 1)");
    expect(changeColor("@example")).toEqual("rgba(55, 162, 126, 1)");
  });

  //   test("should return purple color for words starting with '#'", () => {
  //     expect(changeColor("#hashtag")).toEqual("rgba(118, 89, 200, 1)");
  //     expect(changeColor("#example")).toEqual("rgba(118, 89, 200, 1)");
  //   });

  //   test("should return blue color for URLs", () => {
  //     expect(changeColor("https://www.example.com")).toEqual(
  //       "rgba(57, 137, 225, 1)"
  //     );
  //     expect(changeColor("www.example.com")).toEqual("rgba(57, 137, 225, 1)");
  //   });

  //   test("should return red color for email addresses", () => {
  //     expect(changeColor("user@example.com")).toEqual("rgba(218, 175, 97, 1)");
  //     expect(changeColor("info@example.org")).toEqual("rgba(218, 175, 97, 1)");
  //   });

  //   test("should return black color for default cases", () => {
  //     expect(changeColor("normal")).toEqual("rgba(0, 0, 0, 1)");
  //     expect(changeColor("123")).toEqual("rgba(0, 0, 0, 1)");
  //   });
});
