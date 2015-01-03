class Explosion extends Phaser.Group {

  constructor(game, frame) {
    super(game, frame);

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(30, 'explosion');
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.forEach(function(explosion) {
      explosion.animations.add('explosion');
    });

    this.explosionSound = this.game.add.audio('explosion');
  }


  /**
   * Play explosion
   * @param  {Number} velocity
   */
  play(explosion, velocity = 0) {
    explosion.body.velocity.y = velocity;
    explosion.alpha = 0.7;
    explosion.play('explosion', 30, false, true);

    this.explosionSound.play();
  }

}

export default Explosion;
