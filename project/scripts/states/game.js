import Starfield  from 'prefabs/starfield';
import PlayerShip from 'prefabs/player-ship';
import GreenEnemyGroup from 'prefabs/enemies/green-enemy-group';
import Explosion from 'prefabs/explosion';

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

    this.explosions = new Explosion(this.game);

    // add green enemies
    this.greenEnemies = new GreenEnemyGroup(this.game);

    // add ship
    this.ship = new PlayerShip(this.game);
    this.game.add.existing(this.ship);

  }


  update() {
    // enable collision between the player and greenEnemies
    this.game.physics.arcade.overlap(
      this.ship, this.greenEnemies, this.onCollision, null, this
    );

    // enable collision between the player's ammo and greenEnemies
    this.game.physics.arcade.overlap(
      this.greenEnemies, this.ship.weapon.bullets, this.onHitEnemy, null, this
    );
  }


  render() {
    // this.ship.weapon.bullets.forEach(function(bullet) {
    //   this.game.debug.body(bullet);
    // }, this);

    // this.greenEnemies.forEach(function(enemy) {
    //   this.game.debug.body(enemy);
    // }, this);
  }


  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */

  /**
   * Handle collision between player's ship and enemies
   * @param  {Ship} ship
   * @param  {Enemy} enemy
   */
  onCollision(ship, enemy) {
    var explosion = this.explosions.getFirstExists(false);

    explosion.reset(
      enemy.body.x + enemy.body.halfWidth,
      enemy.body.y + enemy.body.halfHeight
    );

    this.explosions.play(explosion, enemy.body.velocity.y);

    enemy.kill();
  }


  /**
   * On player's bullet hit enemies
   * @param  {Ammo} bullet
   * @param  {Enemy} enemy
   */
  onHitEnemy(bullet, enemy) {
    var explosion = this.explosions.getFirstExists(false);

    explosion.reset(
      bullet.body.x + bullet.body.halfWidth,
      bullet.body.y + bullet.body.halfHeight
    );

    this.explosions.play(explosion, -enemy.body.velocity.y);

    bullet.kill();
    enemy.kill();
  }
}

export default Game;
