import SimpleCannon from 'prefabs/weapons/simple-cannon';
import TripleCannon from 'prefabs/weapons/triple-cannon';

var MAXSPEED     = 400,
    DRAG         = 400,
    ACCELARATION = 600;

class PlayerShip extends Phaser.Sprite {

  constructor(game) {
    super(game, 0, 0, 'playerShip');

    this.x = this.game.width / 2;
    this.y = this.game.height - this.height - 50;

    this.health = 100;
    this.weapon = new SimpleCannon(this.game);
    this.trail  = this.createShipTrail();

    this.trail.start(false, 5000, 10);

    this.anchor.setTo(0.5, 0.5);

    // enable physics
    this.game.physics.arcade.enableBody(this);
    this.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.body.drag.setTo(DRAG, DRAG);

    // create control keyboard control keys
    this.cursors    = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.leftButton = this.game.input.activePointer;
  }


  update() {
    this.body.acceleration.x = 0;
    this.body.acceleration.y = 0;

    if(!!this.alive) {
      this.moveWithMouse();
      this.moveWithKeyboard();
      this.stopAtScreenEdges();
      this.createBankEffect();

      // Update weapon's position and FIRE!
      if(this.leftButton.isDown || this.fireButton.isDown) {
        this.weapon.updatePosition(this.x, this.y, this.angle)
                   .updateBodyVelocity(this.body.velocity.x)
                   .fire();
      }

      // update trail's position
      this.trail.x = this.x;
      this.trail.y = this.y;
    }
  }


  /**
   * Move Ship with keyboard
   */
  moveWithKeyboard() {
    var move = function(direction, context) {
      var coordinate = 'x', acceleration = ACCELARATION;

      if(direction === Phaser.UP   || direction === Phaser.DOWN) { coordinate = 'y'; }
      if(direction === Phaser.LEFT || direction === Phaser.UP)   { acceleration = -ACCELARATION; }

      context.body.acceleration[coordinate] = acceleration;
    };

    // move sideways
    if      (this.cursors.left.isDown)  { move(Phaser.LEFT, this);  }
    else if (this.cursors.right.isDown) { move(Phaser.RIGHT, this); }

    // move up / down
    if      (this.cursors.up.isDown)    { move(Phaser.UP, this);    }
    else if (this.cursors.down.isDown)  { move(Phaser.DOWN, this);  }
  }


  /**
   * Move with Mouse
   */
  moveWithMouse() {
    if((this.game.input.x < this.game.width  - 20 && this.game.input.x > 20) ||
       (this.game.input.y < this.game.height - 20 && this.game.input.y > 20))
    {
      var minDist = 100,
          distX   = this.game.input.x - this.x,
          distY   = this.game.input.y - this.y;

      this.body.velocity.x = MAXSPEED * this.game.math.clamp(distX / minDist, -1, 1);
      this.body.velocity.y = MAXSPEED * this.game.math.clamp(distY / minDist, -1, 1);
    }
  }


  /**
   * Squish and rotate ship for illusion of "bank"
   */
  createBankEffect() {
    var bank = this.body.velocity.x / MAXSPEED;
    this.scale.x = 1 - Math.abs(bank) / 2;
    this.angle = bank * 30;
  }


  /**
   * Create ship trail
   * @return {Emitter}
   */
  createShipTrail() {
    var trail = this.game.add.emitter(this.x, this.y + 10, 400);
    trail.width = 10;
    trail.makeParticles('cannonBullet'); // reuse cannonBullet asset =)
    trail.setXSpeed(30, -30);
    trail.setYSpeed(200, 180);
    trail.setRotation(50, -50);
    trail.setAlpha(1, 0.01, 800);
    trail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);

    return trail;
  }


  /**
   * Stop player at screen edges
   */
  stopAtScreenEdges() {
    var dimension;

    ['x', 'y'].forEach(function(direction) {
      dimension = direction === 'y' ? 'height' : 'width';

      if(this[direction] > this.game[dimension] - 50) {
        this[direction] = this.game[dimension] - 50;
        this.body.acceleration[direction] = 0;
      }

      if(this[direction] < 50) {
        this[direction] = 50;
        this.body.acceleration[direction] = 0;
      }
    }, this);
  }

}

export default PlayerShip;
