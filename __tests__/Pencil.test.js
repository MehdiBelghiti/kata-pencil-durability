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

});
