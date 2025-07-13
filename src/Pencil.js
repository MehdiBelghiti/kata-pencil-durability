const UPPERCASE_COST = 2;
const LOWERCASE_COST = 1;
const WHITESPACE_OTHERS_COST = 0;

class Pencil {
  constructor({ durability = 100, length = 5, eraserDurability = 100 } = {}) {
    this._validateNumber(
      durability,
      "Durability must be a non-negative number"
    );
    this._validateNumber(length, "Length must be a non-negative number");

    this.paper = "";
    this.durability = durability;
    this.initialDurability = durability;
    this.length = length;
    this.eraserDurability = eraserDurability;
    this.lastErasedIndex = -1;
  }

  getDurability() {
    return this.durability;
  }

  getLength() {
    return this.length;
  }

  getEraserDurability() {
    return this.eraserDurability;
  }

  getLastErasedIndex() {
    return this.lastErasedIndex;
  }

  readPaper() {
    return this.paper;
  }

  write(text) {
    this._validateString(text, "Text must be a string");

    const written = this._applyDurabilityAndWrite(text);
    this.paper += written;
  }

  sharpen() {
    if (this.length > 0) {
      this.durability = this.initialDurability;
      this.length -= 1;
    }
  }

  erase(word) {
    this._validateString(word, "Word to erase must be a string");

    const lastIndex = this.paper.lastIndexOf(word);
    if (lastIndex === -1) return;

    let newPaper = this.paper.split("");

    for (let i = lastIndex + word.length - 1; i >= lastIndex; i--) {
      if (this.eraserDurability <= 0) break;

      if (newPaper[i] !== " ") {
        newPaper[i] = " ";
        this.eraserDurability--;
        this.lastErasedIndex = i;
      }
    }

    this.paper = newPaper.join("");
  }

  edit(newText) {
    this._validateString(newText, "Text to insert must be a string");

    if (this.lastErasedIndex === -1) return;

    let paperArr = this.paper.split("");
    let i = this.lastErasedIndex;

    for (let char of newText) {
      if (i >= paperArr.length) break;

      if (paperArr[i] === " ") {
        paperArr[i] = char;
      } else {
        paperArr[i] = "@";
      }

      i++;
    }

    this.paper = paperArr.join("");
    this.lastErasedIndex = -1;
  }

  _validateNumber(input, message) {
    if (typeof input !== "number" || input < 0) {
      throw new Error(message);
    }
  }

  _validateString(input, message) {
    if (typeof input !== "string") {
      throw new Error(message);
    }
  }

  _applyDurabilityAndWrite(text) {
    return [...text]
      .map((char) => {
        const cost = this._getCharCost(char);
        if (this.durability < cost) return " ";
        this.durability -= cost;
        return char;
      })
      .join("");
  }

  _getCharCost(char) {
    if (/[A-Z]/.test(char)) return UPPERCASE_COST;
    if (/[a-z]/.test(char)) return LOWERCASE_COST;
    return WHITESPACE_OTHERS_COST;
  }
}

module.exports = Pencil;
