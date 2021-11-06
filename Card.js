const { priorities } = require('./consts');

const TRUMP_COEF = 100; // коефіцієнт козиря

class Card {
  constructor(suit, value, deck) {
    this.suit = suit;
    this.value = value;
    this.deck = deck;
  }

  get isTrump() {
    if (this.deck.trump) {
      return this.deck.trump === this.suit;
    }
  }

  get priority() {
    return this.isTrump ? TRUMP_COEF * priorities[this.value] : priorities[this.value];
  }

  canBeat(anotherCard) {
    if (this.isTrump) {
      if (anotherCard.isTrump) {
        return this.priority > anotherCard.priority;
      }
      
      return true;
    }

    // Наша карта НЕ козирна та інша карта теж
    if (!anotherCard.isTrump) {
      if (this.suit === anotherCard.suit) {
        return this.priority > anotherCard.priority;
      }

      return false;
    }

    return false;
  }
}

module.exports = Card;