class MainView {
  constructor (model, boardEl, scoreEl, gameOverEl) {
    this.model = model;
    this.board = boardEl;
    this.scoreBoard = scoreEl;
    this.gameOver = gameOverEl;
    this.model.addObserver(this);
    this.ctrl = new MainController(model, this);
  }

  // lyssnar på broadcasts från mainController
  update (message) {
    if(message === 'newGame') {
      this.model.gz = 0;
      this.model.score = 0;
      $('#gameOver').empty();
      this.model.notifyObservers('newScore');
      this.initGrid();
    }

    else if (message === 'clicked') {
      console.log(this.model.activeCard);
      this.ctrl.ready = true;
    }

    else if(message === 'newScore') {
      $('#score').html('Score: ' + this.model.score);
    }

    else if(message === 'endGame') {
      $('#gameOver').html('You win!');
    }
  }

  // ritar upp brädet från model
  initGrid () {
    this.board.html('');
    model.createCards();
    // model.cards = model.shuffle(model.cards);
    for(let j = 0; j < this.model.boardSize.y; j++) {
      for(let i = 0; i < this.model.boardSize.x ; i++) {
        var size = this.model.boardSize.x * j + i;
        $('#board').append('<div id="card' + size + '" class="cards"></div>');
        $('#card' + size).append(model.cards[size].getFront());
        $('#card' + size).append(model.cards[size].getBack());
      }
      this.board.append('</br>');
    }
  this.ctrl.initGridOnClick();
  this.ctrl.clickOnButton();
  }
}
