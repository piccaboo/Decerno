function card(id) {
  this.id = id;
  this.r = null;
  this.g = null;
  this.b = null;
  this.color = null;
  this.frontColor = '#fcfcfc';
  this.backColor = '#fff';
  this.startAt = 1000;
  this.flipped = false;
  this.backContentImage = null;
  this.frontContentImage = null;
  this.flipCompleteCallbacks = new Array();

  this.flip = function() {
    $("#" + this.id).flip({
      direction: this.flipMethod,
      color: this.backColor,
      content: this.getBackContent(),
      onEnd: this.onFlipComplete()
    });

    // $("#" + this.id + " img").show();
    $("#" + this.id).css('background-image', ''); //gömmer bakgrundsbilden som är given i uppgiften

    this.flipped = true;
  };

  this.onFlipComplete = function() {
    while(this.flipCompleteCallbacks.length > 0) {
      this.flipCompleteCallbacks[this.flipCompleteCallbacks.length - 1]();
      this.flipCompleteCallbacks.pop();
    }
  };

  this.revertFlip = function() {
    console.log("Reverting Card " + this.id);
    // $("#" + this.id + " img").hide();
    $(".colorSquare").remove(); //Tar bort färgrutan och visar baksidan av kortet igen
    $("#" + this.id).css('background-image','url(images/backOfCards.png)'); //lägger till kortet igen
    $("#" + this.id).revertFlip();
    this.flipped = false;
  };

  this.setR = function(sR) {
    this.r = sR;
  };

  this.setG = function(sG) {
    this.g = sG;
  };

  this.setB = function(sB) {
    this.b = sB;
  };

  this.setColor = function() {
    this.color = '' + this.r + ', ' + this.g + ', ' + this.b + '';
  };

// sätter bild på kortet som ska vändas, SKA EJ ANVÄNDAS
  this.setBackContentImage = function(sBackContentImage) {
    this.backContentImage = sBackContentImage;
  };

// sätter setCardId till this.id
  this.setCardId = function(sIdOfCard) {
    this.id = sIdOfCard;
  };

  this.setStartAt = function(iStartAt) {
    this.startAt = iStartAt;
  };

  this.setFrontColor = function(sColor) {
    this.frontColor = sColor;
  };

  this.setBackColor = function(sColor) {
    this.backColor = sColor;
  };

  this.setFlipMethod = function(sFlipMethod) {
    this.flipMethod = sFlipMethod;
  };
// Lägger till bakgrundsbilden som är given i uppgiften
  this.getHTML = function() {
    return '<div id="' + this.id + '" class="card ' + this.frontColor + '" style="background-image: url(images/backOfCards.png);"></div>';
  };

  this.getStartAt = function() {
    return this.startAt;
  };

  this.getFlipped = function() {
    return this.flipped;
  };

  //Ritar upp divs med tillhörande färgkoder
  this.getBackContent = function() {
    // return '<img src="' + this.backContentImage + '" />';
    return '<div class="colorSquare" style="background-color: rgb(' + this.color + ')" />';
  };

  this.getBackContentImage = function() {
    return this.backContentImage;
  };

  this.addFlipCompleteCallback = function(callback) {
    this.flipCompleteCallbacks.push(callback);
  };

}
