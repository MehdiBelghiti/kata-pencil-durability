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
      const isLowercase = /[a-z]/.test(char);
      const isUppercase = /[A-Z]/.test(char);

      let cost = 0;
      if (isLowercase) cost = 1;
      else if (isUppercase) cost = 2;

      if (this.durability < cost) {
        result += " ";
      } else {
        result += char;
        this.durability -= cost;
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
