const Deck = require('./Deck');
const GameField = require('./GameField');
const PlayerList = require('./PlayerList');
const {
  PENDING_STATUS, STARTED_STATUS, MAX_PLAYERS,
  TAKE_ROUND, BEAT_ROUND
} = require('./consts');

class Game {
  constructor() {
    this.gameField = new GameField();
    this.players = new PlayerList(this);
    this.deck = new Deck(this.players);
    this.status = PENDING_STATUS;
  }

  addPlayer(playerData) {
    if (this.status === PENDING_STATUS && this.players.length < MAX_PLAYERS) {
      this.players.append(playerData);
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
    this.deck.cardsInitDistribution();
    this.status = STARTED_STATUS;
  }

  startNextRound(roundType) {
    this.gameField.clear();
    this.deck.cardsDistribution();
    console.log('----------------------------------------');
    this.players.makeActiveNext(roundType === TAKE_ROUND ? 2 : 1);
  }
}

module.exports = Game;