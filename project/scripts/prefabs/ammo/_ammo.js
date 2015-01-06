class Ammo extends Phaser.Group {
  /**
   * Constructor
   * @param  {Game} game
   * @param  {Number} total     total of elements
   * @param  {String} assetName
   * @param  {*} parent
   */
  constructor(game, total, assetName, parent) {
    super(game, parent);

    this.enableBody      = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.createMultiple(total, assetName);

    this.setAll('damageAmount', 0);
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
  }
}

export default Ammo;
