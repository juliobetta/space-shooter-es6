class EnemyGroup extends Phaser.Group {
  /**
   * [constructor description]
   * @param  {Game} game
   * @param  {Number} totalPerTime=5 Total ship per cicle
   * @param  {Number} spacing=1000   Time in ms between ships
   * @param  {Group|Sprite|null} parent
   */
  constructor(game, totalPerTime = 5, spacing = 1000, parent = null) {
    super(game, parent);

    this.spacing         = spacing;
    this.totalPerTime    = totalPerTime;
    this.enableBody      = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    for(let i = 0; i < this.totalPerTime; i++) {
      this.add(this.createNewMember());
    }

    this.game.time.events.add(1000, this.launch, this);
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

export default EnemyGroup;
