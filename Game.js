const Player = require('./Player');
const Deck = require('./Deck');
const CircularList = require('./CircularList');
const { PENDING_STATUS, STARTED_STATUS } = require('./consts');

class Game {
  constructor() {
    this.players = new CircularList();
    this.deck = new Deck();
    this.status = PENDING_STATUS;
  }

  addPlayer(playerData) {
    if (this.status === PENDING_STATUS) {
      this.players.push(new Player(playerData));
    }
  }

  removePlayer(id) {
    this.players.remove((el) => el.id === id);
  }

  start() {
    this.deck.generate();
    this.deck.cardsDistribution(this.players);
    this.status = STARTED_STATUS;
  }
}

module.exports = Game;