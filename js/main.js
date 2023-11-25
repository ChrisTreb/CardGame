import { shuffle, generateCard, cards } from "./Card.js";
import { Game, blackJack, setCardsValues } from "./Game.js";

const CONTAINER = document.getElementById("container");
const GAME = new Game(1, "Black Jack", blackJack);

if (GAME.gameName === "Black Jack") {
  /* Game Setup */
  var playerTurn = true;
  var playerPoints = 0;
  var dealerPoints = 0;
  var cardsPlayed = [];
  setCardsValues(cards);
  var deckOfCards = shuffle(cards);
  console.log(deckOfCards);

  /* HTML elements */
  CONTAINER.innerHTML = blackJack;
  const MESSAGE_CONTAINER = document.getElementById("message-container");
  const MESSAGE = document.getElementById("message");
  const D_SIDE = document.getElementById("bj-dealer-side");
  const P_SIDE = document.getElementById("bj-player-side");
  const BTN_GIVE = document.getElementById("give");
  const BTN_STOP = document.getElementById("stop");
  const BTN_RESET = document.getElementById("reset");

  /* Buttons behaviours */
  BTN_GIVE.addEventListener("click", function() {
    if (playerTurn === true) {
      let card = generateCard(deckOfCards, deckOfCards.length);
      removeCard(deckOfCards);
      console.log(deckOfCards);
      P_SIDE.appendChild(card);
      playerPoints += parseInt(card.getAttribute("data-value"));
      console.log("Point du joureur : " + playerPoints);
      getResults(playerPoints, dealerPoints);
    }
  });
  BTN_STOP.addEventListener("click", function() {
    playerTurn = false;
    while (dealerPoints <= playerPoints) {
      let card = generateCard(deckOfCards, deckOfCards.length);
      removeCard(deckOfCards);
      D_SIDE.appendChild(card);
      dealerPoints += parseInt(card.getAttribute("data-value"));
      console.log("Points du dealer : " + dealerPoints);
      if (dealerPoints === 21) {
        break;
      }
      getResults(playerPoints, dealerPoints);
    }
    playerTurn = true;
  });
  BTN_RESET.addEventListener("click", function() {
    reset();
  });

  function reset() {
    D_SIDE.innerHTML = "";
    P_SIDE.innerHTML = "";
    BTN_GIVE.style.display = "block";
    BTN_STOP.style.display = "block";
    MESSAGE.style.opacity = "0";
    playerPoints = 0;
    dealerPoints = 0;
    console.log("Point du joueur : " + playerPoints +", Points du dealer : " + dealerPoints);
  }

  function getResults(PPoints, DPoints) {
    if (PPoints > 21 || DPoints === 21 || (DPoints > PPoints && DPoints <= 21)) {
      MESSAGE.style.opacity = "1";
      MESSAGE.innerText = "YOU LOSE";
      BTN_GIVE.style.display = "none";
      BTN_STOP.style.display = "none";
    }
    if (DPoints > 21 || PPoints === 21 || (PPoints > DPoints && DPoints !=0)) {
      MESSAGE.style.opacity = "1";
      MESSAGE.innerText = "YOU WIN";
      BTN_GIVE.style.display = "none";
      BTN_STOP.style.display = "none";
    }
  }

  function removeCard(deck) {
    deck.pop();
    return deck;
  }
}




