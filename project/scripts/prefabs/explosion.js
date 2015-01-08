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

    this.explosionSound = this.game.add.audio('explosion', 0.85);
    this.bigExplosionSound = this.game.add.audio('bigExplosion');
  }


  /**
   * Play explosion
   * @param  {Number} velocityY
   * @param {Number} velocityX
   */
  play(explosion, velocityY = 0, velocityX = 0) {
    explosion.body.velocity.y = velocityY;
    explosion.body.velocity.x = velocityX;
    explosion.alpha = 0.7;
    explosion.play('explosion', 30, false, true);

    this.explosionSound.play();
  }


  /**
   * Play bigger explosion
   * @param {Number} x
   * @param {Number} y
   */
  playBigExplosion(x, y) {
    var emitter = this.game.add.emitter(x, y);

    emitter.width  = 50;
    emitter.height = 50;
    emitter.x      = x;
    emitter.y      = y;

    emitter.makeParticles('explosion', [0,1,2,3,4,5,6,7], 10);
    emitter.setAlpha(0.9, 0, 800);
    emitter.setScale(0.1, 0.6, 0.1, 0.6, 500, Phaser.Easing.Quintic.OUT);
    emitter.start(false, 1000, 10, 10);

    this.bigExplosionSound.play();
  }

}

export default Explosion;
