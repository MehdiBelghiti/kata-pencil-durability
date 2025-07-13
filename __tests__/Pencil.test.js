const Pencil = require("../src/Pencil");

describe("Pencil writing", () => {
  test("paper starts empty", () => {
    const pencil = new Pencil();
    expect(pencil.readPaper()).toBe("");
  });

  test("writing appends text to paper", () => {
    const pencil = new Pencil();
    pencil.write("hello");
    expect(pencil.readPaper()).toBe("hello");
  });

  test("writing multiple times appends text correctly", () => {
    const pencil = new Pencil();
    pencil.write("hello");
    pencil.write(" world");
    expect(pencil.readPaper()).toBe("hello world");
  });

  test("writing an empty string leaves paper unchanged", () => {
    const pencil = new Pencil();
    pencil.write("hello");
    pencil.write("");
    expect(pencil.readPaper()).toBe("hello");
  });

  test("writing non-string should throw", () => {
    const pencil = new Pencil();

    expect(() => pencil.write(123)).toThrow("Text must be a string");
    expect(() => pencil.write({})).toThrow("Text must be a string");
    expect(() => pencil.write(null)).toThrow("Text must be a string");
    expect(() => pencil.write(undefined)).toThrow("Text must be a string");
    expect(() => pencil.write(true)).toThrow("Text must be a string");
    expect(() => pencil.write(false)).toThrow("Text must be a string");
  });
});

describe("Pencil durability", () => {
  test("writing lowercase letters reduces durability by 1 per character", () => {
    const pencil = new Pencil({ durability: 4 });

    pencil.write("text");

    expect(pencil.getDurability()).toBe(0);
  });
});
