import Enemy from 'prefabs/enemies/_enemy';

class GreenEnemy extends Enemy {
  constructor(game, x, y, frame) {
    super(game, x, y, 'greenEnemy', frame);

    this.damageAmount = 20;
    this.anchor.x     = 0.5;
    this.anchor.y     = 0.5;
    this.scale.x      = 0.5;
    this.scale.y      = 0.5;
    this.angle        = 180;
    this.trail        = this.createShipTrail();

    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);

    this.body.setSize(this.width * 3/4, this.height * 3/4);

    this.events.onKilled.add(function() {
      this.trail.kill();
    }, this);
  }


  update() {
    if(!this.exists) { return; }

    this.angle = 180 - this.game.math.radToDeg(
      Math.atan2(this.body.velocity.x, this.body.velocity.y)
    );

    this.trail.x = this.x;
    this.trail.y = this.y;

    // Kill enemies once they go off screen
    if(this.y > this.game.height + 200) {
      this.kill();
    }
  }


  /**
   * Add ship trail
   * @return {Emitter}
   */
  createShipTrail() {
    var trail = this.game.add.emitter(this.x, this.y - 10, 100);

    trail.width = 10;
    trail.makeParticles('explosion', [1,2,3,4,5]);
    trail.setXSpeed(20, -20);
    trail.setRotation(50, -50);
    trail.setAlpha(0.4, 0, 800);
    trail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Quintic.Out);

    return trail;
  }


  /**
   * Launch Ship
   */
  launch() {
    super.launch();

    this.body.velocity.x = this.game.rnd.integerInRange(-300, 300);
    this.body.velocity.y = 300;
    this.body.drag.x     = 100;

    this.trail.start(false, 800, 1);
  }
}

export default GreenEnemy;
