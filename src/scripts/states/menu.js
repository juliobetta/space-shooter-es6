class Menu {

  create() {
    this.game.input.onDown.add(this.startGame, this);
  }

  startGame() {
    this.game.state.start('game');
  }

}

export default Menu;
