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

  get allCardsBeated() {
    return this.length > 0 ? this.gameStacks.every(stack => stack.length === 2) : true;
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

  get notBeatedCards() {
    return this.gameStacks.filter(stack => stack.length === 1).map(stack => stack[0]);
  }

  attack(card) {
    console.log('attack');
    const newStack = [card];
    this.gameStacks.push(newStack);
  }

  beat(stack, card) {
    console.log('beat: ');
    stack[1] = card;
  }

  clear() {
    this.gameStacks = [];
  }
}

module.exports = GameField;