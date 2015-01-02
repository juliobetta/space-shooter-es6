import Cannon from 'prefabs/weapons/_cannon';

/**
 * Fires a simple bullet
 */
class SimpleCannon extends Cannon {

  constructor(game, x, y) {
    super(game, x, y);
    this.bulletSpacing = 250;
  }

  fire() {
    if(!this.isBulletAvailable()) { return; }

    super.fire();

    // Grab the first bullet we can from the pool and fire it
    var bullet = this.bullets.getFirstExists(false);

    if(bullet) {
      this.resetBullet(bullet);

      bullet.angle = this.angle;

      this.game.physics.arcade.velocityFromAngle(
        bullet.angle - 90, this.bulletSpeed, bullet.body.velocity
      );

      bullet.body.velocity.x += this.bodyVelocity;

      this.bulletTimer = this.game.time.now + this.bulletSpacing;
    }
  }

}

export default SimpleCannon;
