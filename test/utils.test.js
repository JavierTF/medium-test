import { colors, changeColor, lightenColor } from "../utils/utils";

describe("colors object", () => {
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

describe("changeColor function", () => {
  test("should return default color for non-special words", () => {
    // const { result } = renderHook(() => changeColor("simpleWord"));
    expect(changeColor("default")).toBe(colors["default"]);
  });

  test('should return "@" color for words starting with @', () => {
    expect(changeColor("@jest")).toBe(colors["@"]);
  });

  test('should return "#" color for words starting with #', () => {
    expect(changeColor("#test")).toBe(colors["#"]);
  });

  test('should return "link" color for URLs', () => {
    expect(changeColor("www.google.com")).toBe(colors["link"]);
    expect(changeColor("https://www.google.com")).toBe(colors["link"]);
    expect(changeColor("http://www.google.com")).toBe(colors["link"]);
    expect(changeColor("ftp://www.google.com")).toBe(colors["link"]);
  });

  test('should return "email" color for email addresses', () => {
    expect(changeColor("xavi@aleph.engineering")).toBe(colors["email"]);
  });
});

describe("lightenColor function", () => {
  test("should lighten the given color", () => {
    expect(lightenColor("rgba(255, 0, 0, 1)")).toBe("rgba(255, 0, 0, 0.09)");
  });

  test("should return rgb(0, 0, 0, 0 if the color doens´t march with rgba format)", () => {
    expect(lightenColor("asd")).toBe("rgba(0, 0, 0, 0)");
  });
});
