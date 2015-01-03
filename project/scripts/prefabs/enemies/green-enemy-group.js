import EnemyGroup from 'prefabs/enemies/_enemy-group';
import GreenEnemy from 'prefabs/enemies/green-enemy';

class GreenEnemyGroup extends EnemyGroup {

  constructor(game, parent) {
    super(
      /* Game         = */ game,
      /* totalPerTime = */ 5,
      /* spacing      = */ 1000,
      /* parentGroup  = */ parent
    );
  }

  /**
   * Create new group member
   * @return {GreenEnemy}
   */
  createNewMember() {
    return new GreenEnemy(this.game);
  }
}

export default GreenEnemyGroup;
