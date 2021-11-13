const Deck = require('./Deck');
const Card = require('./Card');
const Game = require('./Game');
const Drawer = require('./Drawer');
const { cardSuits, cardValues } = require('./consts');

async function main() {
  const game = new Game();
  const drawer = new Drawer(game);
  game.addPlayer({ name: 'Roman', id: 1 });
  game.addPlayer({ name: 'Polina', id: 2 });
  game.addPlayer({ name: 'Vadik', id: 3 });
  game.start();
  console.log('Trump: ', game.deck.trump);
  const me = game.getPlayerById(1);
  const polina = game.getPlayerById(2);
  const vadik = game.getPlayerById(3);
  
  for (let i = 0; i < 100; i++) {
    if (game.players.playersInGame.length <= 1) {
      break;
    }
    await drawer.render();
    const activePlayer = game.players.activePlayer;
    const defencePlayer = game.players.defencePlayer;
    const afterDefencePlayer = game.players.getNextInGame(game.players.defencePlayer);
    console.log('DECK SIZE:', game.deck.cards.length);
    console.log(`Active player: ${activePlayer.name}: `, activePlayer.cards.length);
    console.log(`Defence player: ${defencePlayer.name}: `, defencePlayer.cards.length);
    console.log(`After Defence player: ${afterDefencePlayer.name}: `, afterDefencePlayer.cards.length);
    activePlayer.throwCardOnField(activePlayer.cards[0]);
    await drawer.render();
    const ok1 = defencePlayer.beatCard(game.gameField.gameStacks[0], defencePlayer.cards[0]);
  
    await drawer.render();
    if (ok1) {
      activePlayer.finishMove();
      afterDefencePlayer.finishMove();
      await drawer.render();
    } else {
      console.log('Can not beat');
      defencePlayer.unableToBeatCards();
      activePlayer.finishMove();
      if (activePlayer !== afterDefencePlayer) {
        const ok2 = afterDefencePlayer.throwCardOnField(afterDefencePlayer.cards[0]);
        await drawer.render();
        afterDefencePlayer.finishMove();
        if (ok2) {
          activePlayer.finishMove();
        }
      }
    }
  }
  // БАЗОВА ЛОГІКА ГОТОВА, треба логіку обробки того, що у юзера закінчились карти(тобто, що він виграв)
  console.log();
}

main();