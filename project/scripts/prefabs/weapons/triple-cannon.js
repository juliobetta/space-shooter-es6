import Cannon from 'prefabs/weapons/_cannon';

/**
 * Fire three bullets at once
 */
class TripleCannon extends Cannon {

  constructor(game, x, y) {
    super(game, x, y);
    this.bulletSpacing = 550;
  }


  fire() {
    if(!this.isBulletAvailable()) { return; }

    super.fire();

    var bullet, spreadAngle;

    for(var i = 0; i < 3; i++) {
      bullet = this.bullets.getFirstExists(false);

      if(bullet) {
        this.resetBullet(bullet);

        // Spread angle of 1st and 3rd bullets
        if(i === 0) { spreadAngle = -20; }
        if(i === 1) { spreadAngle = 0;   }
        if(i === 2) { spreadAngle = 20;  }

        bullet.angle = this.angle + spreadAngle;
        this.game.physics.arcade.velocityFromAngle(
          spreadAngle - 90, this.bulletSpeed, bullet.body.velocity
        );
        bullet.body.velocity.x += this.bodyVelocity;

        this.bulletTimer = this.game.time.now + this.bulletSpacing;
      }
    }
  }

}

export default TripleCannon;
