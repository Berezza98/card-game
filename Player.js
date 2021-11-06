class Player {
  constructor({ name, id }) {
    this.name = name;
    this.id = id;
    this.cards = [];
  }

  addCards(cards) {
    if (Array.isArray(cards)) {
      return this.cards = [...this.cards, ...cards];
    }

    this.cards = [...this.cards, cards];
  }
}

module.exports = Player;