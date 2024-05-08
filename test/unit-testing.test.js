import colors from "../utils/utils";

describe.skip("About colors objects", () => {
  test("should define colors correctly", () => {
    expect(colors).toBeDefined();
    expect(colors).toHaveProperty("@", "rgba(55, 162, 126, 1)");
    expect(colors).toHaveProperty("#", "rgba(118, 89, 200, 1)");
    expect(colors).toHaveProperty("link", "rgba(57, 137, 225, 1)");
    expect(colors).toHaveProperty("email", "rgba(218, 175, 97, 1)");
    expect(colors).toHaveProperty("default", "rgba(0, 0, 0, 1)");
  });
});

describe('About changeColor function', () => {
    test('should ', () => {
        
    });
});
