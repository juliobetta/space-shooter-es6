import Starfield       from 'prefabs/starfield';
import PlayerShip      from 'prefabs/player-ship';
import BlueEnemyGroup  from 'prefabs/enemies/blue-enemy-group';
import GreenEnemyGroup from 'prefabs/enemies/green-enemy-group';
import Explosion       from 'prefabs/explosion';
import HUD             from 'prefabs/hud';
import TripleCannon    from 'prefabs/weapons/triple-cannon';

class Game {

  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  create() {
    this.score           = 0;
    this.scoreMultiplier = 10;

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

    // add green enemies
    this.greenEnemies = new GreenEnemyGroup(this.game);
    this.greenEnemies.launch();

    this.explosions = new Explosion(this.game);

    this.hud = new HUD(this.game);
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
    this.addDamageToPlayerShip(enemy.damageAmount, enemy);
    enemy.kill();
  }




  /**
   * On enemy fire hits player
   * @param  {Ammo} bullet
   */
  onHitPlayer(ship, bullet) {
    this.addDamageToPlayerShip(bullet.damageAmount);
    bullet.kill();
  }


  /**
   * Add damage to player's ship
   * @param {Number} damageAmount
   * @param {Enemy} enemy
   */
  addDamageToPlayerShip(damageAmount, enemy = null) {
    this.ship.damage(damageAmount);
    this.hud.updateHealth(this.ship.health);

    if(this.ship.health > 0) { // player is still alive =)
      var explosion = this.explosions.getFirstExists(false),
          object    = enemy || this.ship;

      explosion.reset(
        object.body.x + object.body.halfWidth,
        object.body.y + object.body.halfHeight
      );

      this.explosions.play(explosion, object.body.velocity.y);
    } else { // player is dead =(
      this.explosions.playBigExplosion(this.ship.x, this.ship.y);
    }
  }


  /**
   * On player's bullet hit enemies. "DIE MOTHAFUCKA, DIE!"
   * @param  {Enemy} enemy
   * @param  {Ammo} bullet
   */
  onHitEnemy(enemy, bullet) {
    var explosion = this.explosions.getFirstExists(false);

    explosion.reset(
      bullet.body.x + bullet.body.halfWidth,
      bullet.body.y + bullet.body.halfHeight
    );

    this.explosions.play(explosion, -enemy.body.velocity.y);

    // update score
    this.score += (bullet.damageAmount + enemy.scorePoints) * this.scoreMultiplier;
    this.hud.updateScore(this.score);
    this.onScoreIncreased();

    bullet.kill();
    enemy.kill();
  }


  /**
   * Check score to make the game harder \n/_
   */
  onScoreIncreased() {
    if(this.score > 1000) {
      this.greenEnemies.spacing *= 0.2;
    }

    if(!this.blueEnemies.isLaunched && this.score > 5000) {
      this.blueEnemies.launch();
      this.ship.weapon = new TripleCannon(this.game);
    }
  }
}

export default Game;
