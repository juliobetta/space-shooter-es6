import EnemyGroup from 'prefabs/enemies/_enemy-group';
import BlueEnemy from 'prefabs/enemies/blue-enemy';

class BlueEnemyGroup extends EnemyGroup {

  constructor(game, parent) {
    super(
      /* Game         = */ game,
      /* totalPerTime = */ 30,
      /* parentGroup  = */ parent
    );

    this.totalInWave      = 5;
    this.verticalSpacing  = 70;
    this.timeBetweenWaves = 5000; // ms

    this.setAll('damageAmount', 40);
    this.setAll('scorePoints', 20);
  }

  /**
   * Create new group member
   * @return {BlueEnemy}
   */
  createNewMember() {
    return new BlueEnemy(this.game);
  }


  /**
   * Launch enemy group
   */
  launch() {
    super.launch();

    var startingX = this.game.rnd.integerInRange(100, this.game.width - 100),
        enemy;

    for(let i = 0; i < this.totalInWave; i++) {
      enemy = this.getFirstExists(false);

      if(enemy) {
        enemy.reset(this.game.width / 2, -this.verticalSpacing * i);

        enemy.launch(startingX);
      }
    }

    // Send another enemy wave soon
    this.enemyLaunchTimer = this.game.time.events.add(
      this.timeBetweenWaves,
      this.launch,
      this
    );
  }
}

export default BlueEnemyGroup;
