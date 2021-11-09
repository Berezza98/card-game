const EventEmitter = require('./EventEmitter');
const Card = require('./Card');
const {
  ATTACK, DEFENSE, ACTIVE_MOVE, FINISHED_MOVE,
  TAKE_ROUND, BEAT_ROUND,
} = require('./consts');
const {THROW_CARD_ON_FIELD, FINISH_MOVE, CARD_BEATED } = require('./eventsName');

class Player extends EventEmitter {
  constructor({ name, id }, game) {
    super();

    this.name = name;
    this.id = id;
    this.game = game;
    this.playerList = game.players;
    this.gameField = game.gameField;
    this.deck = game.deck;
    this.cards = [];
    this.isOnline = true;
    this.active = false;
    this.canThrowCard = false;
    this.status = ATTACK;
    this.moveStatus = ACTIVE_MOVE;
  }

  removeOwnCard(card) {
    if (!(card instanceof Card) || !this.cards.includes(card)) {
      return;
    }

    this.cards.splice(this.cards.indexOf(card), 1);
  }

  addCards(cards) {
    if (Array.isArray(cards)) {
      return this.cards = [...this.cards, ...cards];
    }

    this.cards = [...this.cards, cards];
  }

  takeAllCardsFromBoard() {
    if (this.status !== DEFENSE) {
      return;
    }

    console.log(`${this.name} take all cards from a board`);
    this.addCards(this.gameField.cardsOnField);
    this.finishRound(TAKE_ROUND);
  }

  finishRound(roundType) {
    console.log(`${this.name} finished round`);
    this.game.startNextRound(roundType);
  }

  unableToBeatCards() {
    if (this.status !== DEFENSE) {
      return;
    }

    this.finishMove();
  }

  finishMove() { // Закінчив хід "БИТО"
    console.log(`${this.name} finish move`);
    if (this.active) {
      this.allowOtherThrowCards();
    }

    this.moveStatus = FINISHED_MOVE;
    this.emit(FINISH_MOVE, this);
  }

  allowOtherThrowCards() {
    if (!this.active) {
      return;
    }

    this.playerList.filter(player => {
      return player.status !== DEFENSE && player !== this;
    }).forEach(player => {
      player.canThrowCard = true;
    });
  }

  throwCardOnField(card) {
    console.log(`${this.name} throwCardOnField: `, card.suit, card.value);
    if (!(card instanceof Card) || this.status === DEFENSE || !this.cards.includes(card) || !this.canThrowCard) {
      return;
    }
    // кидаємо будь-яку карту на поле, якщо воно пусте, або якщо значення карти вже є на полі
    if (this.gameField.isEmpty || this.gameField.cardValuesOnField.includes(card.value)) {
      console.log('throwCardOnField OK');
      this.gameField.attack(card);
      this.removeOwnCard(card);
      this.emit(THROW_CARD_ON_FIELD, this);
    }
  }

  beatCard(stack, ownCard) {
    if (this.status === ATTACK || !stack) {
      return;
    }
    
    const cardToBeat = stack[0];
    console.log(`${this.name} beatCard: `, ownCard.suit, ownCard.value);
    if (ownCard.canBeat(cardToBeat)) {
      this.gameField.beat(stack, ownCard);
      this.removeOwnCard(ownCard);
      this.emit(CARD_BEATED, this);
      return true;
    }
  }
}

module.exports = Player;