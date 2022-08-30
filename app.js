// constant, let
const phrase = document.querySelector("#phrase");
const overlay = document.querySelector("#overlay");
const start = document.querySelector(".btn__reset");
const phraseList = document.querySelector("#phrase ul");
const keys = document.querySelector("#qwerty");
const lifeList = document.querySelector("#scoreboard ol");
const lifeArr = document.querySelectorAll(".tries img");
const life = document.querySelector(".tries img");
let missed = 0;

// phrases array
let phrases = [
  "a dime a dozen",
  "call it a day",
  "so far so good",
  "the best of both worlds",
  "wild goose chase",
  "haste makes waste",
  "like riding a bycicle",
  "run like the wind",
  "spill the beans",
  "once in a blue moon",
];

// start game button press
start.addEventListener("click", () => {
  if (start.textContent === "Start Game") {
    startGame();
    overlay.style.display = "none";
  } else {
    resetGame();
    startGame();
    overlay.style.display = "none";
  }
});

// return a random phrase from the array
function getRandomPhraseAsArray(arr) {
  const randomNr = Math.floor(Math.random() * arr.length);
  const randomPh = arr[randomNr];
  const characters = randomPh.split("");
  return characters;
}

// adds the letters of a string to the display
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.textContent = arr[i];
    phraseList.append(li);
    const letters = /^[0-9a-zA-Z]+$/;
    if (li.textContent.match(letters)) {
      li.className = "letter";
    } else {
      li.className = "";
      li.style.margin = "10px";
    }
  }
}

// listen for onscreen keys to be clicked
keys.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    button.className = "chosen";
    button.setAttribute("disabled", "");
    const letter = button.textContent;
    const letterFound = checkLetter(letter);

    if (letterFound === null) {
      lifeArr[missed].src = "images/lostHeart.png";
      button.className = "wrong";
      missed++;
    }
  }
  checkWin();
});

// check if a letter is in a phrase
function checkLetter(letter) {
  const letters = document.querySelectorAll(".letter");
  let matchingLtr;
  let match = 0;

  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i].textContent) {
      letters[i].className += " show";
      matchingLtr = letter;
      match++;
    }
  }

  if (match > 0) {
    return matchingLtr;
  } else {
    return null;
  }
}

// check if game has been won or lost
function checkWin() {
  const totalLetters = document.querySelectorAll(".letter");
  const visibleLetters = document.querySelectorAll(".show");
  const h3 = document.createElement("h3");

  // display win message and Play Again
  if (visibleLetters.length === totalLetters.length) {
    removeClass();
    overlay.className = "win";
    overlay.style.display = "flex";
    start.textContent = "Play Again";
    overlay.appendChild(h3);
    h3.textContent = "You Win!";
    showPhrase();

    // display lost message and Try Again
  } else if (missed >= 5) {
    removeClass();
    overlay.className = "lose";
    overlay.style.display = "flex";
    start.textContent = "Try Again";
    overlay.appendChild(h3);
    h3.textContent = "You Lose!";
    showPhrase();
  }
}

function removeClass() {
  for (let i = 0; i < phraseList.children.length; i++) {
    phraseList.children[i].classList.remove("show");
  }
}

// show the correct phrase
function showPhrase() {
  const h4 = document.createElement("h4");
  h4.textContent =
    "The correct phrase was: " + phraseList.textContent.toUpperCase();
  overlay.appendChild(h4);
}

// start game function
function startGame() {
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}

// reset game function
function resetGame() {
  missed = 0;

  // remove items
  while (phraseList.firstChild) {
    phraseList.removeChild(phraseList.firstChild);
  }
  const h3 = document.querySelector("h3");
  h3.parentNode.removeChild(h3);
  const h4 = document.querySelector("h4");
  h4.parentNode.removeChild(h4);
  for (let i = 0; i < lifeArr.length; i++) {
    lifeArr[i].src = "images/liveHeart.png";
  }

  //reset classes and attributes of keyboard
  const keysButton = document.querySelectorAll("#qwerty button");
  for (let i = 0; i < keysButton.length; i++) {
    keysButton[i].classList.remove("chosen");
    keysButton[i].classList.remove("wrong");
    keysButton[i].removeAttribute("disabled");
  }
}
