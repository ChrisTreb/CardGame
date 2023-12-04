import { HEADS } from "./Card.js";
import { currentUrl } from "./Environement.js";

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

export { BLACKJACK, setCardsValues };