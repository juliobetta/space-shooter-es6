import EnemyGroup from 'prefabs/enemies/_enemy-group';
import GreenEnemy from 'prefabs/enemies/green-enemy';

class GreenEnemyGroup extends EnemyGroup {

  constructor(game, parent) {
    super(
      /* Game         = */ game,
      /* totalPerTime = */ 5,
      /* parentGroup  = */ parent
    );

    this.spacing = 1000;
  }

  /**
   * Create new group member
   * @return {GreenEnemy}
   */
  createNewMember() {
    return new GreenEnemy(this.game);
  }


  /**
   * Launch enemy group
   */
  launch() {
    var enemy = this.getFirstExists(false);

    if(enemy) {
      enemy.reset(this.game.rnd.integerInRange(0, this.game.width), -20);
      enemy.launch();
    }

    // Send another enemy soon
    this.enemyLaunchTimer = this.game.time.events.add(
      this.game.rnd.integerInRange(this.spacing, this.spacing + 1000),
      this.launch,
      this
    );
  }
}

export default GreenEnemyGroup;
