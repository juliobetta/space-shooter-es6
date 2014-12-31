var MAXSPEED = 400,
    DRAG     = 400;

class PlayerShip extends Phaser.Sprite {

  constructor(game) {
    super(game, 0, 0, 'playerShip');

    this.x = this.game.width / 2;
    this.y = this.game.height - this.height - 50;

    this.health      = 100;
    this.weaponLevel = 1;
    this.bulletTimer = 0;

    this.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enableBody(this);
    this.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.body.drag.setTo(DRAG, DRAG);
  }


  update() {}
}

export default PlayerShip;
