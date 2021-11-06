const Player = require('./Player');
const Deck = require('./Deck');
const GameField = require('./GameField');
const CircularList = require('./CircularList');
const { PENDING_STATUS, STARTED_STATUS, MAX_PLAYERS } = require('./consts');

class Game {
  constructor() {
    this.gameField = new GameField();
    this.players = new CircularList();
    this.deck = new Deck();
    this.status = PENDING_STATUS;
  }

  addPlayer(playerData) {
    if (this.status === PENDING_STATUS && this.players.length < MAX_PLAYERS) {
      this.players.push(new Player(playerData, this.gameField));
    }
  }

  getPlayerById(id) {
    return this.players.find(player => player.id === id);
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