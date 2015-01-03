import Weapon from 'prefabs/weapons/_weapon';
import CannonBulletGroup from 'prefabs/ammo/cannon-bullet-group';

class Cannon extends Weapon {
  constructor(game, x, y) {
    super(game, x, y);
    this.bullets    = new CannonBulletGroup(this.game);
    this.cannonFire = this.game.add.audio('cannonFire');
  }


  fire() {
    this.cannonFire.play();
  }
}

export default Cannon;
