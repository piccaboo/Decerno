class Model {
  constructor (){
    this.observers = []; //prenumeranter på events
    this.cards = []; //innehåller kort-objekt med id och color
    this.score = 0; //poängräkning
    this.gz = 0; // håller koll på när brädet är tömt
    this.colorList = ['red','blue', 'green', 'yellow', 'pink', 'brown', 'orange', 'black'];
    this.boardSize = {
      x:4,
      y:4
    }; //sätter storleken på brädet
  }

  //lägger till observers
  addObserver (observer){
    this.observers.push(observer)
  }

  // broadcastar event till alla observers
  notifyObservers (message) {
    for(let i = 0 ; i < this.observers.length ; i ++) {
      this.observers[i].update(message);
    }
  }

  // skapar korten och lägger till id och färg från colorList
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

    updateScore (int) {
      this.score = this.score+int;
    }

    endOfGame(int) {
      this.gz = this.gz + int;
      if (this.gz == 8) {
        this.notifyObservers('endGame');
      }
    }

    // shuffle(array) { // OBS! INTE EGEN KOD!
    //   var currentIndex = array.length, temporaryValue, randomIndex;
    //
    //   // While there remain elements to shuffle...
    //   while (0 !== currentIndex) {
    //
    //     // Pick a remaining element...
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex -= 1;
    //
    //     // And swap it with the current element.
    //     temporaryValue = array[currentIndex];
    //     array[currentIndex] = array[randomIndex];
    //     array[randomIndex] = temporaryValue;
    //   }
    //
    //   return array;
    // }
}


// klass som skapar kortobjekt
class Card {
  constructor (index, setColor) {
    this.color = setColor;
    this.id = index;
    this.flipped = false;
    this.inGame = true;
  }
  getFront () {
    return '<div id="' + this.id + '" class="front" style="background-color: ' + this.color + '"></div>'
  }
  getBack () {
    return '<div id="' + this.id + '" class="back" style="background-image: url(images/backOfCards.png)"></div>'
  }
}
