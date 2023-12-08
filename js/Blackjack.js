import { HEADS } from "./Card.js";
import { currentUrl } from "./Environement.js";
import { Game } from "./Game.js";

const BLACKJACK = "<img id='bj-logo' src='" + currentUrl + "img/bj-logo.png' />" +
"<div id='bj-dealer-side'>" +
"<p id='dpoints'>Dealer points <span id='dpoints-value'>0</span><p/>" + 
"</div>" + 
"<div id='bj-player-side'>" +
"<p id='ppoints'>Player points  <span id='ppoints-value'>0</span><p/>" + 
"</div>" +
"<div id='bj-buttons'>" +
"<button class='bj-btn' id='give'>Give</button>" +
"<button class='bj-btn' id='stop'>Stop</button>" +
"<button class='bj-btn' id='reset'>Reset</button>" +
"</div>";

const GAME = new Game(1, "Black Jack", BLACKJACK);

const MESSAGE = document.getElementById("message");
const D_SIDE = document.getElementById("bj-dealer-side");
const P_SIDE = document.getElementById("bj-player-side");
const D_POINTS = document.getElementById("dpoints-value");
const P_POINTS = document.getElementById("ppoints-value");
const BTN_GIVE = document.getElementById("give");
const BTN_STOP = document.getElementById("stop");
const BTN_RESET = document.getElementById("reset");

function setCardsValues(cards) {
  cards.forEach(card => {
    if (HEADS.includes(card.label)) {
      if(card.label === HEADS[3]) {
        card.value = 11;
      } else {
        card.value = 10
      }
    } else {
      card.value = parseInt(card.label);
    }
  });
  return cards;
}

export { GAME, MESSAGE, D_SIDE, P_SIDE, D_POINTS, P_POINTS, BTN_GIVE, BTN_STOP, BTN_RESET, setCardsValues };