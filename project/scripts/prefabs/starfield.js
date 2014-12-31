class Starfield extends Phaser.TileSprite {

  constructor(game) {
    super(game, 0, 0, 800, 600, 'starfield');

    this.autoScroll(0.0, 200.0);
  }

}

export default Starfield;
