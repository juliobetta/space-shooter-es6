import Starfield  from 'prefabs/starfield';
import PlayerShip from 'prefabs/player-ship';
import BlueEnemyGroup from 'prefabs/enemies/blue-enemy-group';
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

    // add ship
    this.ship = new PlayerShip(this.game);
    this.game.add.existing(this.ship);

    // add blue enemies
    this.blueEnemies = new BlueEnemyGroup(this.game);
    this.blueEnemies.lockTarget(this.ship);
    this.blueEnemies.launch();

    // add green enemies
    this.greenEnemies = new GreenEnemyGroup(this.game);
    this.greenEnemies.launch();

    this.explosions = new Explosion(this.game);
  }


  update() {
    [this.greenEnemies, this.blueEnemies].forEach(function(enemies) {
      // enable collision between the player and enemies
      this.game.physics.arcade.overlap(
        this.ship, enemies, this.onCollision, null, this
      );

      // enable collision between the player's ammo and enemies
      this.game.physics.arcade.overlap(
        enemies, this.ship.weapon.ammo, this.onHitEnemy, null, this
      );
    }, this);

    this.blueEnemies.forEach(function(enemy) {
      // enable collision between enemies' bullets and player's ship
      this.game.physics.arcade.overlap(
        enemy.weapon.ammo, this.ship, this.onHitPlayer, null, this
      );
    }, this);
  }


  render() {
    // this.ship.weapon.bullets.forEach(function(bullet) {
    //   this.game.debug.body(bullet);
    // }, this);

    // this.blueEnemies.forEach(function(enemy) {
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


  /**
   * On enemy fire hits player
   * @param  {Ammo} bullet
   */
  onHitPlayer(ship, bullet) {
    var explosion = this.explosions.getFirstExists(false);

    explosion.reset(
      ship.body.x + ship.body.halfWidth,
      ship.body.y + ship.body.halfHeight
    );

    this.explosions.play(explosion, ship.body.velocity.y, ship.body.velocity.x);

    // if(player.health > 0) explosion.play('explosion', 30, false, true);
    bullet.kill();
  }
}

export default Game;
