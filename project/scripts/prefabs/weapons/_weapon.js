class Weapon {

  /**
   * Constructor
   * @param {Game} game
   * @param {Float} x=0.0
   * @param {Float} y=0.0
   * @param {Float} angle=0.0
   */
  constructor(game, x = 0.0, y = 0.0, angle = 0.0) {
    this.game  = game;
    this.x     = x;
    this.y     = y;
    this.angle = angle;

    this.bodyVelocity = 0.0;
    this.bulletTimer  = 0;
    this.bulletSpeed  = 400;
    this.bullets      = null;
  }


  /**
   * To avoid them being allowed to fire too fast we set a time limit
   * @return {Boolean}
   */
  isBulletAvailable() {
    return this.game.time.now > this.bulletTimer;
  }


  /**
   * Get weapon's ammunition
   * @return {Group}
   */
  /* abstract */ getAmmunition() {}


  /**
   * Shoot!!!
   */
  /* abstract */ fire() {
    this.bullets = this.getAmmunition();
  }


  /**
   * Update weapon's position
   * @param  {Float} x
   * @param  {Float} y
   * @param  {Float} angle
   * @return {Weapon}
   */
  updatePosition(x, y, angle) {
    this.x     = x;
    this.y     = y;
    this.angle = angle;
    return this;
  }


  /**
   * Update body velocity
   * @param  {Float} value
   * @return {Weapon}
   */
  updateBodyVelocity(value) {
    this.bodyVelocity = value;
    return this;
  }


  /**
   * Reset bullet
   * @param  {Object} bullet
   */
  resetBullet(bullet) {
    var bulletOffset = 20 * Math.sin(this.game.math.degToRad(this.angle));
    bullet.reset(this.x + bulletOffset, this.y);
  }
}

export default Weapon;
