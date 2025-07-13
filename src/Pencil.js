class Pencil {
  constructor({ durability = 100 } = {}) {
    this.paper = "";
    this.durability = durability;
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
}

module.exports = Pencil;
