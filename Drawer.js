const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const { CARD_COORDS, SPRITE_CARD_HEIGHT, SPRITE_CARD_WIDTH } = require('./cardSprite');

const CARD = {
  width: 80,
  height: 120
};

const USERS_OFFSET_X = 100;

class Drawer {
  constructor(gameState) {
    this.gameState = gameState;
    this.width = 1000;
    this.height = 600;
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d');
    this.counter = 1;
  }

  createBackground() {
    this.ctx.save();
    this.ctx.fillStyle = '#31a02d';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  drawTrump() {
    const trumpCard = this.gameState.deck.trumpCard;
    const trumpName = `${trumpCard.suit}-${trumpCard.value}`;
    const trumpCoords = CARD_COORDS[trumpName];

    this.ctx.save();
    this.ctx.translate(this.width - 100 , 50);
    this.ctx.drawImage(this.cardsImage, trumpCoords.x, trumpCoords.y, SPRITE_CARD_WIDTH, SPRITE_CARD_HEIGHT, 0, 0, CARD.width, CARD.height);
    this.ctx.restore();
  }

  async drawDeck() {
    const deck = this.gameState.deck.cards;

    this.ctx.save();
    this.ctx.translate(this.width - 100, 20);
    const image = await loadImage('./images/card-back.png');
    this.ctx.drawImage(image, 0, 0, CARD.width, CARD.height);
    this.ctx.font = "bold 40px sans-serif";
    const text = deck.length.toString();
    const { width: textWidth } = this.ctx.measureText(text);
    this.ctx.fillText(text, (CARD.width - textWidth) / 2, 70);
    this.ctx.restore();
  }

  async drawPlayers() {
    const circleRadius = (this.height / 2) - 20;
    const players = this.gameState.players;

    this.ctx.save();
    this.ctx.translate(this.width / 2 - USERS_OFFSET_X, this.height / 2);
    const playerImage = await loadImage('./images/player.png');
    this.ctx.beginPath();
    this.ctx.arc(0, 0, circleRadius, 0, 2 * Math.PI);
    this.ctx.stroke();
    const radiansDiff = 2 * Math.PI / players.length;
    players.forEach((player, index) => {
      const x = Math.cos(radiansDiff * index + Math.PI / 2) * circleRadius;
      const y = Math.sin(radiansDiff * index + Math.PI / 2) * circleRadius;

      this.drawImageInCenter(playerImage, x, y, 60, 60);
      this.ctx.font = "bold 40px sans-serif";
      this.ctx.fillText(player.name, x, y - 50);
      this.ctx.fillText(player.active ? 'Active' : '', x, y - 80);
      this.drawPlayerCards(player, x, y);
    });
    this.ctx.restore();
  }

  drawPlayerCards(player, x, y) {
    const cards = player.cards;
    this.ctx.save();
    this.ctx.translate(x, y);
    cards.forEach((card, index) => {
      const name = `${card.suit}-${card.value}`;
      const coords = CARD_COORDS[name];
      this.drawImageInCenter(this.cardsImage, (index * 20) + 50, 0, CARD.width, CARD.height, coords.x, coords.y, SPRITE_CARD_WIDTH, SPRITE_CARD_HEIGHT);
    });
    this.ctx.restore();
  }

  drawFieldStack() {
    this.ctx.save();
    this.ctx.translate(this.width / 2 - 100, this.height / 2);
    const gameStacks = this.gameState.gameField.gameStacks;

    gameStacks.forEach(([attackCard, beatCard], index) => {
      const attackName = `${attackCard.suit}-${attackCard.value}`;
      const attackCoords = CARD_COORDS[attackName];
      this.drawImageInCenter(this.cardsImage, index * 60, 0, CARD.width, CARD.height, attackCoords.x, attackCoords.y, SPRITE_CARD_WIDTH, SPRITE_CARD_HEIGHT);

      if (beatCard) {
        const beatName = `${beatCard.suit}-${beatCard.value}`;
        const beatCoords = CARD_COORDS[beatName];
        this.drawImageInCenter(this.cardsImage, index * 60 + 20, 0, CARD.width, CARD.height, beatCoords.x, beatCoords.y, SPRITE_CARD_WIDTH, SPRITE_CARD_HEIGHT);
      }
    });

    this.ctx.restore();
  }

  drawImageInCenter(image, x, y, width, height, offsetX, offsetY, offsetWidth, offsetHeight) {
    if (offsetX || offsetX === 0 && offsetY || offsetY === 0 && offsetWidth || offsetWidth === 0 && offsetHeight || offsetHeight === 0) {
      return this.ctx.drawImage(image, offsetX, offsetY, offsetWidth, offsetHeight, x - width / 2, y - height / 2, width, height);
    }

    this.ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
  }

  createImage(counter) {
    const buffer = this.canvas.toBuffer('image/png');
    const folder = path.join(__dirname, 'fieldImages');
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    fs.writeFileSync(path.join(folder, `field-${counter}.png`), buffer);
  }

  async preload() {
    const cards = await loadImage('./images/cards.png');
    this.cardsImage = cards;
  }

  async render() {
    await this.preload();
    this.createBackground();
    this.drawTrump();
    await this.drawDeck();
    await this.drawPlayers();
    this.drawFieldStack();
    this.createImage(this.counter);
    this.counter++;
  }
}

module.exports = Drawer;