class BulletGroup extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);

    this.enableBody      = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.createMultiple(30, 'bullet');
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 1);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
  }

}

export default BulletGroup;
