class Enemy extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);

    this.trail  = null;
    this.exists = false;
  }


  /**
   * Launch ship
   */
  launch() {
    this.exists = true;
  }
}

export default Enemy;
