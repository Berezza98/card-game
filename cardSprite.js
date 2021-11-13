const {
  SPADES, HEARTS, DIAMONDS, CLUBS,
  SIX, SEVEN, EIGHT, NINE,
  TEN, JACK, QEEN, KING,
  ACE, cardSuits, cardValues
} = require('./consts');

const WIDTH = 225;
const HEIGHT = 315;

function generateCardCoords() {
  const coords = {};
  const xOffset = 4;

  cardSuits.forEach((suit, suitIndex) => {
    cardValues.forEach((value, valueIndex) => {
      const offset = value === ACE ? 0 : xOffset * WIDTH;
      coords[suit + '-' + value] = {
        x: offset + valueIndex * WIDTH,
        y: suitIndex * HEIGHT
      }
    });
  });

  return coords;
}

const CARD_COORDS = generateCardCoords();

module.exports = {
  CARD_COORDS,
  SPRITE_CARD_HEIGHT: HEIGHT,
  SPRITE_CARD_WIDTH: WIDTH,
};