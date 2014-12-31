class Preload {

  constructor() {
    this.asset = null;
    this.ready = false;
  }

  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  preload() {
    this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.loadImages();
  }

  create() {
    this.asset.cropEnabled = false;
  }


  update() {
    if(!!this.ready) {
      this.game.state.start('game');
    }
  }


  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */

  onLoadComplete() {
    this.ready = true;
  }


  loadImages() {
    this.load.image('starfield', 'assets/starfield.png');
  }

  loadAudios() {}
  loadSpritesheets() {}
  loadFonts() {}

}

export default Preload;
