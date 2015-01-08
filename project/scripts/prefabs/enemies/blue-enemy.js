import Enemy from 'prefabs/enemies/_enemy';
import SimpleCannon from 'prefabs/weapons/simple-cannon';
import ColorPlasma from 'prefabs/ammo/color-plasma';

class BlueEnemy extends Enemy {
  constructor(game, x, y, frame) {
    super(game, x, y, 'blueEnemy', frame);

    this.frequency    = 70;
    this.spread       = 60;
    this.firingDelay  = 2000; // ms
    this.weapon       = new SimpleCannon(this.game, new ColorPlasma(this.game));

    this.body.setSize(this.width * 2, this.height * 2);
  }


  update() {
    if(!this.exists) { return; }

    super.update();

    // Wave moviment
    this.body.x = this.startingX + Math.sin(this.y / this.frequency) * this.spread;

    // Squish and rotate for illusion of "banking"
    var bank = Math.cos((this.y + 60) / this.frequency);

    this.scale.x = 0.5 - Math.abs(bank) / 8;
    this.angle   = 180 - bank * 2;

    this.fire();
  }


  /**
   * Launch Ship
   * @param {Number} [stargingX=0]
   */
  launch(startingX = 0) {
    super.launch();

    this.startingX       = startingX;
    this.body.velocity.y = 180;
  }


  /**
   * Shoot against player
   */
  fire() {
    var bullet = this.weapon.ammo.getFirstExists(false),
        angle;

    if(bullet &&
        this.alive &&
        this.totalAmmo &&
        this.y > this.game.width / 8 &&
        this.game.time.now > this.firingDelay + this.lastShot
    ) {
      this.lastShot = this.game.time.now;
      this.totalAmmo--;

      bullet.reset(this.x, this.y + this.height / 2);

      angle = this.game.physics.arcade.moveToObject(
        bullet, this.target, this.weapon.bulletSpeed
      );
      bullet.angle = this.game.math.radToDeg(angle);
    }
  }
}

export default BlueEnemy;
