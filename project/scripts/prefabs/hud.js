class HUD extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);

    this.scoreText  = this.game.add.text(
      10, 10, 'Score: 0', {font: '20px Arial', fill: '#fff'}
    );

    this.healthText = this.game.add.text(
      this.game.world.width - 150, 10, 'Health: ' + 100 + '%', {
        font: '20px Arial', fill: '#fff'
      }
    );

    this.add(this.scoreText);
    this.add(this.healthText);
  }

  /**
   * Update Score Text
   * @param  {Number} score = 0
   */
  updateScore(score = 0) {
    this.scoreText.text = 'Score: ' + score;
  }


  /**
   * Update Health Text
   * @param  {Number} health = 100
   */
  updateHealth(health = 100) {
    health = health < 0 ? 0 : health;
    this.healthText.text = 'Health: ' + health + '%';
  }


  /**
   * Reset HUD
   */
  reset() {
    this.updateScore();
    this.updateHealth();
  }

}

export default HUD;
