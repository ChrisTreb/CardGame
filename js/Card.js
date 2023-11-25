class Card {
  constructor(label, sign, id, value) {
    this.label = label;
    this.sign = sign;
    this.id = id;
    this.value = value;
  }
}

const SIGNS = ["Coeur", "Carreau", "Trèfle", "Pique"];
const HEADS = ["Valet", "Reine", "Roi", "As"];
var cards = [];

function generateCards() {
  // Génère les figures et As
  for(let i=0; i < HEADS.length; i++) {
    for(let j=0; j < SIGNS.length; j++) {
      let card = new Card(HEADS[i], SIGNS[j]);
      cards.push(card);
    }
  }
  // Génère les nombres
  for(let k=0; k<SIGNS.length; k++) {
    let counter = 2;
    while(counter < 11) {
      let card = new Card(counter.toString(), SIGNS[k]);
      cards.push(card);
      counter ++;
    }
  }

  // Set cards Ids
  for (let l=0; l < cards.length; l++) {
    cards[l].id = l;
  }
}

function shuffle(arr) {
  arr = arr.sort((a, b) => 0.5 - Math.random());
  return arr;
}

function generateCard(cards, deckSize) {
  let cardNum = deckSize - 1 ;
  let card = cards[cardNum]; 
  let div = document.createElement("div");
  div.setAttribute("data-value", card.value);
  div.classList.add('card');
  if (card.sign === SIGNS[0] || card.sign === SIGNS[1]) {
    div.classList.add('red');
  } else {
    div.classList.add('black');
  }
  let p = document.createElement("p");
  p.innerText = card.label + " de " + card.sign;
  div.appendChild(p);
  
  return div;
}

generateCards();

export {generateCards, shuffle, generateCard, cards, SIGNS, HEADS };