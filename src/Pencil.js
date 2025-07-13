class Pencil {
  constructor() {
    this.paper = "";
  }
  write(text) {
    this.paper += text;
  }
  readPaper() {
    return this.paper;
  }
}

module.exports = Pencil;
