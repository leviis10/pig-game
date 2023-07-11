"use strict";

// Element selector
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");

// Initial state
const scores = [];
let currentScore, activePlayer, isPlaying;

// Function
function switchPlayer() {
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function newGame() {
  document
    .querySelector(`.player--${activePlayer}`)
    ?.classList.remove("player--winner");

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  player0El.classList.add("player--active");
}

// Roll dice button handler
btnRollEl.addEventListener("click", function () {
  if (!isPlaying) {
    return;
  }

  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove("hidden");
  diceEl.setAttribute("src", `./img/dice-${dice}.png`);

  if (dice !== 1) {
    currentScore += dice;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

// Hold button handler
btnHoldEl.addEventListener("click", function () {
  if (!isPlaying) {
    return;
  }

  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    isPlaying = false;
    const winnerPlayer = document.querySelector(`.player--${activePlayer}`);

    diceEl.classList.add("hidden");
    winnerPlayer.classList.add("player--winner");
    winnerPlayer.classList.remove("player--active");

    return;
  }

  switchPlayer();
});

//  New game button handler
btnNewEl.addEventListener("click", newGame);

newGame();
