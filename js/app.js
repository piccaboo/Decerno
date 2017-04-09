var model = new Model();
var board = $("#board");
var score = $("#score");
var gameOver = $("#gameOver");
var mainView = new MainView(model, board, score, gameOver);
model.notifyObservers('newGame');
