import Ammo from 'prefabs/ammo/_ammo';

class DefaultPlasma extends Ammo {

  constructor(game, parent) {
    super(game, 30, 'defaultPlasma', parent);

    this.setAll('anchor.y', 1);

    this.forEach(function(ammo) {
      ammo.damageAmount = 20;
    });
  }

}

export default DefaultPlasma;
