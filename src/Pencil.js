class Pencil {
  constructor({ durability = 100 } = {}) {
    this.paper = "";
    this.durability = durability;
  }

  write(text) {
    if (typeof text !== "string") {
      throw new Error("Text must be a string");
    }

    const degradedResult = this.degradePencil(text);

    this.paper += degradedResult;
  }

  degradePencil(text) {
    let result = "";

    for (const char of text) {
      if (this.durability <= 0 && /[a-z]/.test(char)) {
        result += " ";
      } else {
        result += char;
        if (/[a-z]/.test(char)) {
          this.durability -= 1;
        }
      }
    }

    return result;
  }

  getDurability() {
    return this.durability;
  }

  readPaper() {
    return this.paper;
  }
}

module.exports = Pencil;
