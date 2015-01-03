import Starfield  from 'prefabs/starfield';
import PlayerShip from 'prefabs/player-ship';
import GreenEnemyGroup from 'prefabs/enemies/green-enemy-group';

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

    // add green enemies
    this.greenEnemies = new GreenEnemyGroup(this.game);
  }

  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */

}

export default Game;
