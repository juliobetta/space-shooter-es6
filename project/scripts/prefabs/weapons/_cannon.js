import Weapon from 'prefabs/weapons/_weapon';
import CannonBulletGroup from 'prefabs/ammo/cannon-bullet-group';

class Cannon extends Weapon {
  constructor(game, x, y) {
    super(game, x, y);
  }

  getAmmunition() {
    return new CannonBulletGroup(this.game);
  }
}

export default Cannon;
