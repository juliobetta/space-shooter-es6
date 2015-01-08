class Enemy extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);

    this.trail  = null;
    this.exists = false;
    this.target = null;

    this.anchor.setTo(0.5, 0.5);

    this.anchor.x     = 0.5;
    this.anchor.y     = 0.5;
    this.scale.x      = 0.5;
    this.scale.y      = 0.5;
    this.angle        = 180;
    this.scorePoints  = 0;
    this.damageAmount = 0;

    this.game.physics.arcade.enableBody(this);
  }


  update() {
    // Kill enemies once they go off screen
    if(this.y > this.game.height + 200) {
      this.kill();
      if(this.trail !== null) {
        this.trail.on = false;
      }
    }
  }

  /**
   * Launch ship
   */
  launch() {
    this.totalAmmo = 1;
    this.lastShot  = 0;
    this.exists    = true;
  }
}

export default Enemy;
