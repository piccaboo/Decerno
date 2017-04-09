class MainController {
  constructor (model, view) {
    this.model = model;
    this.view = view;
    this.ready = true;
    this.flipped = null;
  }

  clickOnCard(index) {
    if(this.flipped == null) {
      this.flipped = this.model.cards[index];
    }
    else if(this.flipped) {
      console.log(this.model.cards[index].color === this.flipped.color);
      this.flipped = null;
      //this.flipped = index;
    }

    // this.ready = false;
    // this.model.activeCard = index;
    // this.model.notifyObservers("clicked");
  }

  initGridOnClick() {
    $(".card").click((event) => {
      this.clickOnCard(event.target.id);
    });
  }
}
