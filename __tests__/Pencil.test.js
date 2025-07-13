const Pencil = require("../src/Pencil");

describe("Pencil", () => {
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
});
