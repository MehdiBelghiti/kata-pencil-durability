class Pencil {
  constructor({ durability = 100, length = 5 } = {}) {
    this._validateDurability(durability);
    this._validateLength(length);
    this.paper = "";
    this.durability = durability;
    this.initialDurability = durability;
    this.length = length;
  }

  _validateLength(length) {
    if (typeof length !== "number" || length < 0) {
      throw new Error("Length must be a non-negative number");
    }
  }

  _validateDurability(durability) {
    if (typeof durability !== "number" || durability < 0) {
      throw new Error("Durability must be a non-negative number");
    }
  }

  write(text) {
    if (!this._isValidText(text)) {
      throw new Error("Text must be a string");
    }

    const written = this._applyDurabilityAndWrite(text);
    this.paper += written;
  }

  _applyDurabilityAndWrite(text) {
    let result = "";

    for (const char of text) {
      const cost = this._getCharCost(char);

      if (this.durability < cost) {
        result += " ";
      } else {
        result += char;
        this.durability -= cost;
      }
    }

    return result;
  }

  _getCharCost(char) {
    if (/[A-Z]/.test(char)) return 2;
    if (/[a-z]/.test(char)) return 1;
    return 0; // whitespace and others
  }

  _isValidText(text) {
    return typeof text === "string";
  }

  getDurability() {
    return this.durability;
  }

  readPaper() {
    return this.paper;
  }

  sharpen() {
    if (this.length > 0) {
      this.durability = this.initialDurability;
      this.length -= 1;
    }
  }

  erase(word) {
    this._validateEraserWord(word);
    
    const lastIndex = this.paper.lastIndexOf(word);
    if (lastIndex === -1) return;

    const spaces = " ".repeat(word.length);
    this.paper =
      this.paper.slice(0, lastIndex) +
      spaces +
      this.paper.slice(lastIndex + word.length);
  }

  _validateEraserWord(word) {
    if (typeof word !== "string") {
      throw new Error("Word to erase must be a string");
    }
  }
}

module.exports = Pencil;
