const Player = require('./Player');
const {
  ATTACK, DEFENSE, FINISHED_MOVE, ACTIVE_MOVE,
  TAKE_ROUND, BEAT_ROUND
} = require('./consts');
const { THROW_CARD_ON_FIELD, FINISH_MOVE, CARD_BEATED } = require('./eventsName');

class PlayerList extends Array {
  constructor(game) {
    super();
    this.game = game;
    this._current = -1;
  }

  // for map, filter... methods which creates new arrays
  static get [Symbol.species]() {
    return this;
  }

  set current(value) {
    if (typeof value !== 'number') {
      return;
    }

    this.forEach((player, index) => {
      player.active = index === value;
      player.status = ATTACK;
      player.canThrowCard = index === value;
      player.moveStatus = ACTIVE_MOVE;
    });
    
    // Наступний гравець після активного буде відбиватись
    this.getNext(this.activePlayer).status = DEFENSE;

    this._current = value;
  }

  get current() {
    return this._current;
  }

  get activePlayer() {
    return this.find(player => player.active && player.status === ATTACK);
  }

  get defencePlayer() {
    return this.find(player => player.status === DEFENSE);
  }

  get allAttackPlayersFinishedMove() {
    const allAttackedPlayers = this.filter(p => p.status === ATTACK);
    const allPlayersFinishedMove = allAttackedPlayers.every(p => p.moveStatus === FINISHED_MOVE);
    return allPlayersFinishedMove;
  }

  throwCardOnFieldHandler(player) {
    this.filter(p => p !== player && p.status === ATTACK).forEach((player) => {
      player.moveStatus = ACTIVE_MOVE;
    });
  }

  finishMoveHandler(player) {
    // усі закінчили хід, а defencePlayer нажав, що нічим відбиватись
    if (this.allAttackPlayersFinishedMove && this.defencePlayer.moveStatus === FINISHED_MOVE) {
      console.log('all Attack Players Finished Move');
      this.defencePlayer.takeAllCardsFromBoard();
    } else if (this.allAttackPlayersFinishedMove && this.game.gameField.allCardsBeated) {
      console.log('finish round');
      this.defencePlayer.finishRound(BEAT_ROUND);
    }
  }

  beatCardHandler(player) {
    // робимо усіх атакуючих гравців активними finishedMove
    this.throwCardOnFieldHandler(player);
  }

  append(data) {
    const player = new Player(data, this.game)
    this.push(player);
    player.on(THROW_CARD_ON_FIELD, this.throwCardOnFieldHandler.bind(this));
    player.on(FINISH_MOVE, this.finishMoveHandler.bind(this));
    player.on(CARD_BEATED, this.beatCardHandler.bind(this));
  }

  remove(indexCondition) {
    const index = this.findIndex(indexCondition);
    if (index !== -1) {
      this.splice(index, 1);
    }
  }

  getNext(currentElement) {
    const currentIndex = this.indexOf(currentElement);

    if (currentElement < 0) {
      return;
    }

    const nextIndex = currentIndex === this.length - 1 ? 0 : currentIndex + 1;
    return this[nextIndex];
  }

  getPrev(currentElement) {
    const currentIndex = this.indexOf(currentElement);

    if (currentElement < 0) {
      return;
    }

    const prevIndex = currentIndex === 0 ? this.length - 1 : currentIndex - 1;
    return this[prevIndex];
  }

  makeActiveNext(count) {
    this.current = this.current + count <= this.length - 1 ?
      this.current + count :
      (this.current + count) % this.length;
  }

  makeActivePrev(count) {
    // NEED TO IMPLEMENT CORRECT LOGIC
    if (this.current <= 0 || this.current > this.length - 1) {
      return this.current = this.length - 1;
    }

    this.current -= 1;
  }
}

module.exports = PlayerList;