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

  test("writing whitespace or newlines does not reduce durability", () => {
    const pencil = new Pencil({ durability: 10 });

    pencil.write(" \n\t ");

    expect(pencil.readPaper()).toBe(" \n\t ");
    expect(pencil.getDurability()).toBe(10);
  });

  test("writing uppercase letters reduces durability by 2 each", () => {
    const pencil = new Pencil({ durability: 4 });

    pencil.write("AB");

    expect(pencil.readPaper()).toBe("AB");
    expect(pencil.getDurability()).toBe(0);
  });

  test("writing mixed case reduces durability correctly", () => {
    const pencil = new Pencil({ durability: 10 });

    pencil.write("aBcD");

    expect(pencil.readPaper()).toBe("aBcD");
    expect(pencil.getDurability()).toBe(4);
  });

  test("stops writing when durability runs out", () => {
    const pencil = new Pencil({ durability: 3 });

    pencil.write("abcd");

    expect(pencil.readPaper()).toBe("abc ");
    expect(pencil.getDurability()).toBe(0);
  });

  test("initializing pencil with negative point durability should throw", () => {
    expect(() => new Pencil({ durability: -5 })).toThrow(
      "Durability must be a non-negative number"
    );
  });
});

describe("Pencil: Sharpening", () => {
  test("sharpening restores initial durability", () => {
    const pencil = new Pencil({ durability: 4 });

    pencil.write("Text");
    expect(pencil.getDurability()).toBe(0);

    pencil.sharpen();

    expect(pencil.getDurability()).toBe(4);
  });
  test("sharpening does not change paper content", () => {
    const pencil = new Pencil({ durability: 4 });

    pencil.write("Text");
    const initialPaper = pencil.readPaper();

    pencil.sharpen();

    expect(pencil.readPaper()).toBe(initialPaper);
  });

  test("pencil length decreases when sharpened", () => {
    const pencil = new Pencil({ durability: 5, length: 2 });

    pencil.write("TEXT");
    expect(pencil.getDurability()).toBeLessThan(5);

    pencil.sharpen();
    expect(pencil.getDurability()).toBe(5);
    expect(pencil.getLength()).toBe(1);

    // second sharpening will put it at 0 length
    pencil.write("TEXT");
    pencil.sharpen();
    expect(pencil.getDurability()).toBe(5);
    expect(pencil.getLength()).toBe(0);

    // no more sharpening possible
    pencil.write("TEXT");
    pencil.sharpen();
    expect(pencil.getDurability()).toBeLessThan(5);
    expect(pencil.getLength()).toBe(0);
  });

  test("initializing pencil with negative length should throw", () => {
    expect(() => {
      new Pencil({ durability: 10, length: -1 });
    }).toThrow("Length must be a non-negative number");
  });

  test("Initializing pencil with non number length should throw", () => {
    expect(() => {
      new Pencil({ durability: 10, length: "long" });
    }).toThrow("Length must be a non-negative number");

    expect(() => {
      new Pencil({ durability: 10, length: null });
    }).toThrow("Length must be a non-negative number");
  });
});

describe("Pencil: Eraser", () => {
  test("erases the last occurrence of a word by replacing it with spaces", () => {
    const pencil = new Pencil();
    pencil.write(
      "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
    );

    pencil.erase("chuck");

    expect(pencil.readPaper()).toBe(
      "How much wood would a woodchuck chuck if a woodchuck could       wood?"
    );
  });

  test("multiple erase calls remove earlier occurrences in reverse order", () => {
    const pencil = new Pencil();
    pencil.write("Buffalo Bill chased Bill through the hills with Bill");

    pencil.erase("Bill");
    pencil.erase("Bill");

    expect(pencil.readPaper()).toBe(
      "Buffalo Bill chased      through the hills with     "
    );
  });

  test("erasing a word not present should leave paper unchanged", () => {
    const pencil = new Pencil();
    pencil.write("This is a test sentence.");

    pencil.erase("notpresent");

    expect(pencil.readPaper()).toBe("This is a test sentence.");
  });

  test("erasing a non-string value should throw an error", () => {
    const pencil = new Pencil();
    pencil.write("Hello World");

    expect(() => pencil.erase(123)).toThrow("Word to erase must be a string");
    expect(() => pencil.erase(null)).toThrow("Word to erase must be a string");
    expect(() => pencil.erase({})).toThrow("Word to erase must be a string");
  });
});

describe("Pencil: Eraser Durability", () => {
  test("eraser durability defaults to 100", () => {
    const pencil = new Pencil();
    expect(pencil.getEraserDurability()).toBe(100);
  });

  test("eraser durability decreases by 1 per character erased", () => {
    const pencil = new Pencil({ eraserDurability: 10 });

    pencil.write("Buffalo Bill");
    pencil.erase("Bill");

    expect(pencil.getEraserDurability()).toBe(6);
  });

  test("erasing whitespace does not reduce eraser durability", () => {
    const pencil = new Pencil({ eraserDurability: 10 });

    pencil.write("hello   world");
    pencil.erase("   ");

    expect(pencil.getEraserDurability()).toBe(10);
  });

  test("erasing whitespace with non-whitespace characters reduces eraser durability by non-whitspace character's number only", () => {
    const pencil = new Pencil({ eraserDurability: 10 });

    pencil.write("hello   world");
    pencil.erase("   world");

    expect(pencil.getEraserDurability()).toBe(5);
  });

  test("erasing more characters than eraser durability allows", () => {
    const pencil = new Pencil({ eraserDurability: 3 });
    pencil.write("Buffalo Bill");
    pencil.erase("Bill");

    expect(pencil.readPaper()).toBe("Buffalo B   ");
    expect(pencil.getEraserDurability()).toBe(0);
  });

  test("eraser with zero durability should not erase anything", () => {
    const pencil = new Pencil({ eraserDurability: 0 });
    pencil.write("Buffalo Bill");
    pencil.erase("Bill");

    expect(pencil.readPaper()).toBe("Buffalo Bill");
    expect(pencil.getEraserDurability()).toBe(0);
  });
});
