var cards = new Array(),
flips = new Array('tb', 'bt', 'lr', 'rl'),
iFlippedCard = null,
iCardBeingFlippedId = null,
//BEHÖVS EJ
cardImages = new Array(1,2,3,4,5,6,7,8,9,10),
cardAllocation = null,
iTimer = 0,
iInterval = 100,
iPeekTime = 3000;


//DENNA SKA INTE ANVÄNDAS
function getRandomImageForCard() {

  var iRandomImage = Math.floor((Math.random() * cardAllocation.length)),
  iMaxImageUse = 2;

  while(cardAllocation[iRandomImage] >= iMaxImageUse) {

    iRandomImage = iRandomImage + 1;

    if(iRandomImage >= cardAllocation.length) {
      iRandomImage = 0;
    }
  }
  return iRandomImage;
}

function createCard(iCounter) {
  var currentCard = new card("card" + iCounter);
  iRandomImage = getRandomImageForCard();
  cardAllocation[iRandomImage] = cardAllocation[iRandomImage] + 1;
  currentCard.setR(Math.floor(Math.random() * 255));
  currentCard.setG(Math.floor(Math.random() * 255));
  currentCard.setB(Math.floor(Math.random() * 255));
  currentCard.setColor();
  currentCard.setFrontColor("tileColor" + Math.floor((Math.random() * 5) + 1));
  // currentCard.setFrontContentImage("images/backOfCards.png");
  currentCard.setStartAt(500 * Math.floor((Math.random() * 5) + 1));
  currentCard.setFlipMethod(flips[Math.floor((Math.random() * 3) + 1)]);
  currentCard.setBackContentImage("images/" + (iRandomImage + 1) + ".jpg");

  return currentCard;
}

function initState() {

  cardAllocation = new Array(0,0,0,0,0,0,0,0,0,0); //TIITA UPP!

  while(cards.length > 0) {
    cards.pop();
  }

  $('#gameSection').empty();
  iTimer = 0;
}

//funktion för att rita upp korten i en setSize*setSize matris
function initCards() {
  var setSize = 4;
  var iCounter = 0;
  currentCard = null;

  initState();

  //skapar N-antal kort av antal setSize och ritar upp dem i canvas
  for(iCounter = 0; iCounter < 20; iCounter++) {
    currentCard = createCard(iCounter);
    $('#gameSection').append(currentCard.getHTML());
    cards.push(currentCard);
  }

}

function hideCards(callback) {
  var iCounter = 0;

  for(iCounter = 0; iCounter < cards.length; iCounter++) {
    cards[iCounter].revertFlip();
  }
  callback();
}

function revealCards(callback) {
  var iCounter = 0;
  bCardNotFlipped = false;

  for(iCounter = 0; iCounter < cards.length; iCounter++) {
    if(cards[iCounter].getFlipped() == false) {
      if(iTimer > cards[iCounter].getStartAt()) {
        cards[iCounter].flip();
      } else {
        bCardNotFlipped = true;
      }
    }
  }

  iTimer = iTimer + iInterval;

  if(bCardNotFlipped === true) {
    setTimeout("revealCards(" + callback + ")", iInterval);
  } else {
      callback();
  }
}

function playAudio(sAudio) {

  var audioElement = document.getElementById('audioEngine');

  if(audioElement !== null) {
    audioElement.src = sAudio;
    audioElement.play();
  }
}

function checkMatch() {
  if(iFlippedCard === null) {
    iFlippedCard = iCardBeingFlippedId;
  } else {
    if(cards[iFlippedCard].getBackContentImage() !== cards[iCardBeingFlippedId].getBackContentImage()) {
      setTimeout("cards[" + iFlippedCard + "].revertFlip()", 2000);
      setTimeout("cards[" + iCardBeingFlippedId + "].revertFlip()", 2000);
      playAudio("mp3/ no.mp3");
    } else {
      playAudio("mp3/applause.mp3");
    }
    iFlippedCard = null;
    iCardBeingFlippedId = null;
  }
}

function onPeekComplete() {
  $('div.card').click(function() {
    iCardBeingFlippedId = this.id.substring("card".length);

    if(cards[iCardBeingFlippedId].getFlipped() === false) {
      cards[iCardBeingFlippedId].addFlipCompleteCallback(function() { checkMatch(); });
      cards[iCardBeingFlippedId].flip();
    }
  });
}

function onPeekStart() {
  setTimeout("hideCards( function() { onPeekComplete(); })", iPeekTime);
}

// Funktion som läses in i början som lyssnar efter klick på
// <a> element med id "newGame"
$(document).ready(function() {

  $('#newGame').click(function() {
    initCards();
    setTimeout("revealCards(function() { onPeekStart(); })", iInterval);

  });
});
