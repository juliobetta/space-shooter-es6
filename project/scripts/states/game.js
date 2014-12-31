import Starfield from 'prefabs/starfield';

class Game {

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // add starfield
    this.starfield = new Starfield(this.game);
    this.game.add.existing(this.starfield);
  }

}

export default Game;
