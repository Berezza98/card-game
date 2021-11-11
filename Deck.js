const Card = require('./Card');
const { cardSuits, cardValues, MAX_CARD_COUNT_IN_ONE_HANDS } = require('./consts');
const { getRandomFromArray, shuffle } = require('./utils');

class Deck { // DECK - КОЛОДА КАРТ
  constructor(players) {
    this.players = players;
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

  cardsInitDistribution() { // players - CircularList
    console.log('Init Distribution cards');
    const playersCount = this.players.length;
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
    const activeUserIndex = minTrumpCardIndex % playersCount;
    this.players.current = activeUserIndex;

    cardsForUsing.forEach((card, index) => {
      this.players[index % playersCount].addCards(card);
    });
  }

  cardsDistribution() {
    console.log('Distribution cards');
    if (this.cards.length === 0) {
      this.players.checkWinners();
      return;
    }

    const needCardPlayers = this.players.playersInGame.filter(player => player.cards.length < MAX_CARD_COUNT_IN_ONE_HANDS);
    needCardPlayers.forEach(player => {
      if (this.cards.length === 0) {
        return;
      }

      const countOfNeedCards = MAX_CARD_COUNT_IN_ONE_HANDS - player.cards.length;
      const cardsForUser = this.cards.splice(0, countOfNeedCards); // HERE WE MODIFY this.cards
      player.addCards(cardsForUser);
    });
  }
}

module.exports = Deck;