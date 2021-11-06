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
        // this.trump передається null, NEED TO FIX !!!!
        tmpDeck.push(new Card(suit, value, this));
      });
    });

    shuffle(tmpDeck);
    this.cards = tmpDeck;
    this.trump = this.cards[this.cards.length - 1].suit;
  };

  cardsDistribution(players) { // players - CircularList
    const playersCount = players.length;
    console.log('playersCount: ', playersCount);
    const cardsForUsing = this.cards.splice(0, playersCount * MAX_CARD_COUNT_IN_ONE_HANDS);
    const trumpCards = cardsForUsing.filter(el => el.suit === this.trump);

    const minTrumpCard = trumpCards.reduce((acc, el) => {
      if (!acc) {
        return;
      }

      return acc.priority > el.priority ? el : acc;
    }, trumpCards[0]);
    const minTrumpCardIndex = cardsForUsing.indexOf(minTrumpCard);
    // Set initial active player
    players.current = minTrumpCardIndex % playersCount;

    cardsForUsing.forEach((card, index) => {
      players.getByIndex(index % playersCount).addCards(card);
    });
  }
}

module.exports = Deck;