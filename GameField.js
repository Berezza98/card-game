class GameField {
  constructor() {
    this.gameStacks = [];
  }

  get cardsOnField() {
    return this.gameStacks.flat();
  }

  get isEmpty() {
    return this.cardsOnField.length === 0;
  }

  get cardValuesOnField() {
    const uniqueCards = this.cardsOnField.reduce((acc, el) => {
      return {
        ...acc,
        [el.value]: true
      };
    }, {});

    return Object.keys(uniqueCards);
  }

  createNewStack(card) {
    console.log('createNewStack');
    const newStack = [card];
    this.gameStacks.push(newStack);
  }

  addCardToStack(stack, card) {
    stack.push(card);
  }
}

module.exports = GameField;