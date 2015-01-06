import Weapon from 'prefabs/weapons/_weapon';
import DefaultPlasma from 'prefabs/ammo/default-plasma';

class Cannon extends Weapon {
  constructor(game, ammo, x, y) {
    super(game, x, y);
    this.ammo       = ammo || new DefaultPlasma(this.game);
    this.cannonFire = this.game.add.audio('cannonFire');
  }


  fire() {
    this.cannonFire.play();
  }
}

export default Cannon;
