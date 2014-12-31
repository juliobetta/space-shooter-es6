import Starfield  from 'prefabs/starfield';
import PlayerShip from 'prefabs/player-ship';

class Game {

  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // add starfield
    this.starfield = new Starfield(this.game);
    this.game.add.existing(this.starfield);

    // add ship
    this.ship = new PlayerShip(this.game);
    this.game.add.existing(this.ship);
  }


  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */
}

export default Game;
