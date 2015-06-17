class EnemyGroup extends Phaser.Group {
  /**
   * Constructor
   * @param  {Game} game
   * @param  {Number} totalPerTime=5 Total ship per cicle
   * @param  {Group|Sprite|null} parent
   */
  constructor(game, totalPerTime = 5) {
    super(game);

    this.totalPerTime    = totalPerTime;
    this.enableBody      = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.isLaunched      = false;


    for(var i = 0; i < this.totalPerTime; i++) {
      this.add(this.createNewMember());
    }

    this.setAll('scorePoints', 0);
  }


  /**
   * Launch group of enemies
   */
  launch() {
    this.isLaunched = true;
  }


  /**
   * Lock target
   * @param {Sprite|Group} target
   */
  lockTarget(target) {
    this.setAll('target', target);
  }
}

export default EnemyGroup;
