const Card = require('./Card');

class Player {
  constructor({ name, id }, gameField) {
    this.name = name;
    this.id = id;
    this.gameField = gameField;
    this.cards = [];
    this.isOnline = true;
    this.active = false;
  }

  addCards(cards) {
    if (Array.isArray(cards)) {
      return this.cards = [...this.cards, ...cards];
    }

    this.cards = [...this.cards, cards];
  }

  throwCardOnField(card) {
    console.log('throwCardOnField: ', card);
    if (!(card instanceof Card)) {
      return;
    }

    // кидаємо будь-яку карту на поле, якщо воно пусте, або якщо значення карти вже є на поле
    console.log(this.gameField.isEmpty || this.gameField.cardValuesOnField.includes(card.value));
    if (this.gameField.isEmpty || this.gameField.cardValuesOnField.includes(card.value)) {
      this.gameField.createNewStack(card);
    }
  }

  beatCard(stack, ownCard) {
    const cardToBeat = stack[0];
    if (ownCard.canBeat(cardToBeat)) {
      console.log('beatCard: ', ownCard);
      this.gameField.addCardToStack(stack, ownCard);
    }
  }
}

module.exports = Player;