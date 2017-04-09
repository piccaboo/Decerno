class MainView {
  constructor (model, boardEl, scoreEl, gameOverEl) {
    this.model = model;
    this.board = boardEl;
    this.scoreBoard = scoreEl;
    this.gameOver = gameOverEl;
    this.model.addObserver(this);
    this.ctrl = new MainController(model, this);
  }

  update (message) {
    if(message === 'newGame') {
      this.initGrid();
    }

    else if (message === 'clicked') {
      console.log(this.model.activeCard);
      this.ctrl.ready = true;
    }
  }

  initGrid () {
    this.board.html('');
    model.createCards();
    for(let j = 0; j < this.model.boardSize.y; j++) {
      for(let i = 0; i < this.model.boardSize.x ; i++) {
        var size = this.model.boardSize.x * j + i;
        $('#board').append(model.cards[size].getBack());
        $('#back'+ size).append(model.cards[size].getFront());
      }
      this.board.append('<br/>');
    }
  this.ctrl.initGridOnClick();
  }
}
