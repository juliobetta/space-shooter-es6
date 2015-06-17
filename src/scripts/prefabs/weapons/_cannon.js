import Weapon from 'prefabs/weapons/_weapon';

class Cannon extends Weapon {
  constructor(game, ammo, x, y) {
    super(game, ammo, x, y);
    this.cannonFire = this.game.add.audio('cannonFire');
  }


  fire() {
    this.cannonFire.play();
  }
}

export default Cannon;
