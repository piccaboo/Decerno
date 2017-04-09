class Model {
  constructor (){
    this.observers = [];
    this.cards = [];
    this.score = 0;
    this.colorList = ['red','blue', 'green', 'yellow', 'pink', 'brown', 'orange', 'black'];
    this.boardSize = {
      x:4,
      y:4
    };
  }

  addObserver (observer){
    this.observers.push(observer)
  }

  notifyObservers (message) {
    for(let i = 0 ; i < this.observers.length ; i ++) {
      this.observers[i].update(message);
    }
  }

  createCards () {
    var currentCard = null;
    var numberOfCards = this.colorList.length;

    //Skapar korten och lägger in i cards[]
    for(let i = 0 ; i < numberOfCards*2 ; i++) {
      if(i < numberOfCards){
        currentCard = new Card(i, this.colorList[i]);
        this.cards.push(currentCard);
      }
      else {
          currentCard = new Card(i, this.colorList[i-8]);
          this.cards.push(currentCard);
        }
      }
    }
}

class Card {
  constructor (index, setColor) {
    this.color = setColor;
    this.id = index;
    this.flipped = false;
    this.inGame = true;
  }
  getFront () {
    return '<div id="' + this.id + '" class="card" style="background-color: ' + this.color + '"></div>'
  }
  getBack () {
    return '<div id="back' + this.id + '" class="card" style="background-image: url(images/backOfCards.png)"></div>'
  }
}
