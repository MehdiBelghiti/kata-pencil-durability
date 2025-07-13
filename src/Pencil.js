class Pencil {
  constructor() {
    this.paper = "";
  }
  write(text) {
    if (typeof text !== "string") {
      throw new Error("Text must be a string");
    }

    this.paper += text;
  }
  readPaper() {
    return this.paper;
  }
}

module.exports = Pencil;
