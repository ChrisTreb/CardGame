import { generateCards, shuffle, generateCard, cards } from "./Card.js";
import { Game, blackJack, setCardsValues } from "./Game.js";

const CONTAINER = document.getElementById("container");
const GAME = new Game(1, "Black Jack", blackJack);

if (GAME.gameName === "Black Jack") {
  /* Game Setup */
  var playerTurn = true;
  var playerPoints = 0;
  var dealerPoints = 0;
  setCardsValues(cards);
  var deckOfCards = shuffle(cards);

  /* HTML elements */
  CONTAINER.innerHTML = GAME.setUp;
  const MESSAGE = document.getElementById("message");
  const D_SIDE = document.getElementById("bj-dealer-side");
  const P_SIDE = document.getElementById("bj-player-side");
  const D_POINTS = document.getElementById("dpoints-value");
  const P_POINTS = document.getElementById("ppoints-value");
  const BTN_GIVE = document.getElementById("give");
  const BTN_STOP = document.getElementById("stop");
  const BTN_RESET = document.getElementById("reset");

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
      MESSAGE.style.opacity = "1";
      MESSAGE.innerHTML = "BLACK JACKED<br>YOU LOSE";
      BTN_GIVE.style.display = "none";
      BTN_STOP.style.display = "none";
    }
    if (PPoints === 21) {
      MESSAGE.style.opacity = "1";
      MESSAGE.innerHTML = "BLACK JACK<br>YOU WIN";
      BTN_GIVE.style.display = "none";
      BTN_STOP.style.display = "none";
    }
    if (PPoints > 21 || (DPoints > PPoints && DPoints <= 21)) {
      MESSAGE.style.opacity = "1";
      MESSAGE.innerText = "YOU LOSE";
      BTN_GIVE.style.display = "none";
      BTN_STOP.style.display = "none";
    }
    if (DPoints > 21 || (PPoints > DPoints && DPoints !=0)) {
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




