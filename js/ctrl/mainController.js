class MainController {
  constructor (model, view) {
    this.model = model;
    this.view = view;
    this.ready = true;
    this.click = true;
    this.flipped = null;
    this.matchedCard1 = null;
    this.matchedCard2 = null;
  }


  matchCards(index) {
    //matchningsfunktion som tittar om korten stämmer överens färgmässigt
    if(this.flipped === null) {
      //om det är första kortet som klickas på så sparas id i this.matchedCard1
      console.log("this.flipped is set!");
      this.flipCard(index);
      this.matchedCard1 = this.model.cards[index];
      this.flipped = this.model.cards[index];
    }
    else {
      // om if(this.matchedCard1) så sparas det nyss klickade kortets id i matchedCard2
      console.log('Second card active : ' + this.click);
      this.flipCard(index);
      this.matchedCard2 = this.model.cards[index];
      $('.cards').css('pointer-events', 'none');
      if(this.model.cards[index].color !== this.flipped.color){
        // om korten inte stämmer överens så vänds korten tillbaka efter 2 sekunder och ger -1 poäng
        console.log("Cards don't match! :()");
        this.model.updateScore(-1);
        this.model.notifyObservers('newScore');
        this.model.notifyObservers('waitForMatch');
        setTimeout(()=>{ this.waitFlip();}, 2000);
      }

      else {
        // om korten matchar så tas de bort från spelplanen efter 2 sekunder och man får +1 poäng
        console.log('Cards match! :D');
        this.model.updateScore(1);
        this.model.endOfGame(1);
        this.model.notifyObservers('newScore');
        this.model.notifyObservers('waitForMatch');
        setTimeout(()=>{ this.waitRemove();}, 2000); // dryg att få att fungera
      }
      this.flipped = null; // nollstäler flipped så att ett nytt par kan matchas
    }
    console.log('after match() :' + this.click);
  }

  // Broadcastar om klick har skett på div av klassen .back
  initGridOnClick() {
    console.log('initGridOnClick(): ' + this.click);
      $(".back").click((event) => {
        this.matchCards(event.target.id);
      });
  }

  // broadcastar om knappen New Game har klickats på
  clickOnButton() {
    $('#startGame').click((event) => {
      this.model.notifyObservers('newGame');
    });
  }


  flipCard(pos) {
    $('#' + pos + '.back').css('visibility', 'hidden');
  }

  //vänder ner kort om de är fel
  reversCards(pos, card) {
    $('#' + pos + '.back').css('visibility', 'visible');
    card = null;
  }

  // fördröjd funktion att vända ner korten
  waitFlip() {
    this.reversCards(this.matchedCard1.id, this.matchedCard1);
    this.reversCards(this.matchedCard2.id, this.matchedCard2);
    $('.cards').css('pointer-events', 'auto');
  }

  // fördröjd funktion att ta bort korten
  waitRemove() {
    $('#' + this.matchedCard1.id + '.front').css('visibility', 'hidden');
    $('#' + this.matchedCard2.id + '.front').css('visibility', 'hidden');
    $('#' + this.matchedCard1.id + '.back').css('visibility', 'hidden');
    $('#' + this.matchedCard2.id + '.back').css('visibility', 'hidden');
    $('.cards').css('pointer-events', 'auto');
  }

}
