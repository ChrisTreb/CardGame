import { generateCards, shuffle, generateCard, cards } from "./Card.js";
import { GAME, MESSAGE, D_SIDE, P_SIDE, D_POINTS, P_POINTS, BTN_GIVE, BTN_STOP, BTN_RESET, setCardsValues } from "./Blackjack.js";

const CONTAINER = document.getElementById("container");

if (GAME.id === 1) {
  /* Game Setup */
  var playerTurn = true;
  var playerPoints = 0;
  var dealerPoints = 0;
  setCardsValues(cards);
  var deckOfCards = shuffle(cards);

  /* HTML elements */
  CONTAINER.innerHTML = GAME.setUp;

  /* Buttons behaviours */
  BTN_GIVE.addEventListener("click", function() {
    if (playerTurn === true) {
      let card = generateCard(deckOfCards, deckOfCards.length);
      removeCard(deckOfCards);
      if(deckOfCards.length === 0) {
        generateCards();
        deckOfCards = shuffle(cards);
        setCardsValues(deckOfCards);
      }
      console.log("Cheat mode activated! Next card is : " + deckOfCards[deckOfCards.length - 1].value);
      P_SIDE.appendChild(card);
      playerPoints += parseInt(card.getAttribute("data-value"));
      P_POINTS.innerText = playerPoints;
      getResults(playerPoints, dealerPoints);
    }
  });

  BTN_STOP.addEventListener("click", function() {
    playerTurn = false;
    while (dealerPoints <= playerPoints) {
      let card = generateCard(deckOfCards, deckOfCards.length);
      removeCard(deckOfCards);
      if(deckOfCards.length === 0) {
        generateCards();
        deckOfCards = shuffle(cards);
        setCardsValues(deckOfCards);
      }
      D_SIDE.appendChild(card);
      dealerPoints += parseInt(card.getAttribute("data-value"));
      D_POINTS.innerText = dealerPoints;
      if (dealerPoints === 21) {
        break;
      }
    }
    getResults(playerPoints, dealerPoints);
    playerTurn = true;
  });

  BTN_RESET.addEventListener("click", function() {
    reset();
  });

  function reset() {
    let htmlCards = Array.from(document.getElementsByClassName("card"));
    htmlCards.forEach(card => {
      card.remove();
    });
    BTN_GIVE.style.display = "block";
    BTN_STOP.style.display = "block";
    MESSAGE.style.opacity = "0";
    playerPoints = 0;
    dealerPoints = 0;
    P_POINTS.innerText = playerPoints;
    D_POINTS.innerText = dealerPoints;
  }

  function getResults(PPoints, DPoints) {
    if (DPoints === 21) {
      getResultsHtmlOptions("BLACK JACKED<br>YOU LOSE");
    }
    if (PPoints === 21) {
      getResultsHtmlOptions("BLACK JACK<br>YOU WIN");
    }
    if (PPoints > 21 || (DPoints > PPoints && DPoints < 21)) {
      getResultsHtmlOptions("YOU LOSE");
    }
    if (DPoints > 21 || (PPoints > DPoints && DPoints !=0)) {
      getResultsHtmlOptions("YOU WIN");
    }
  }

  function getResultsHtmlOptions(message) {
    MESSAGE.style.opacity = "1";
    MESSAGE.innerHTML = message;
    BTN_GIVE.style.display = "none";
    BTN_STOP.style.display = "none";
  }

  function removeCard(deck) {
    deck.pop();
    return deck;
  }
}




