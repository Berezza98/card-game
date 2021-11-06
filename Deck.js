const Card = require('./Card');
const { cardSuits, cardValues, MAX_CARD_COUNT_IN_ONE_HANDS } = require('./consts');
const { getRandomFromArray, shuffle } = require('./utils');

class Deck { // DECK - КОЛОДА КАРТ
  constructor() {
    this.cards = [];
    this.trump = null;
  }

  generate() {
    const tmpDeck = [];
    cardValues.forEach(value => {
      cardSuits.forEach(suit => {
        tmpDeck.push(new Card(suit, value, this.trump));
      });
    });

    shuffle(tmpDeck);
    this.cards = tmpDeck;
    this.trump = this.cards[this.cards.length - 1].suit;
  };

  cardsDistribution(players) {
    const playersCount = players.length;
    console.log('playersCount: ', playersCount);
    const cardsForUsing = this.cards.splice(0, playersCount * MAX_CARD_COUNT_IN_ONE_HANDS);
    cardsForUsing.forEach((card, index) => {
      players.getByIndex(index % playersCount).addCards(card);
    });
  }
}

module.exports = Deck;