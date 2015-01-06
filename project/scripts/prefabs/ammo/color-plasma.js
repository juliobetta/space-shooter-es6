import Ammo from 'prefabs/ammo/_ammo';

class ColorPlasma extends Ammo {

  constructor(game, parent) {
    super(game, 30, 'colorPlasma', parent);

    this.callAll('crop', null, { x: 90, y: 0, width: 90, height: 70 });
    this.setAll('alpha', 0.9);
    this.setAll('damageAmount', 40);
    this.forEach(function(ammo) {
      ammo.body.setSize(20, 20);
    });
  }

}

export default ColorPlasma;
