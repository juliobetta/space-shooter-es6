import Ammo from 'prefabs/ammo/_ammo';

class DefaultPlasma extends Ammo {

  constructor(game, parent) {
    super(game, 30, 'defaultPlasma', parent);

    this.setAll('damageAmount', 20);
    this.setAll('anchor.y', 1);
  }

}

export default DefaultPlasma;
