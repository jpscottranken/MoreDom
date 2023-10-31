/*
 *
 *	This is a guessing game program. The user
 *	makes a guess of a number between 1 and 100.
 *	Any number < 0 or > 100, or any non-numeric
 *	guess are considered illegal and "don't
 *	count". In addition, an error message is
 *	shown to the right of the guess field.
 *
 *	If the user guess is within 1 - 100, the
 *	total number of guesses is incremented by 1.
 *
 *	The total number of guesses is shown to the
 *	user at all times.
 *
 *	If the guess is too low or too high, a
 *	corresponding message is shown to the user.
 *
 *	If the user guesses the correct random
 *	number, s/he is given a message their
 *	guess was correct.
 *
 *	If the user guesses the random number in
 *	in 1 - 5 guesses, they are given an
 *	"Expert" designation.
 *
 *	If the user guesses the random number in
 *	in 6 - 10 guesses, they are given an
 *	"Average" designation.
 *
 *	If the user guesses the random number in
 *	> 10 guesses, they are given a "Novice"
 *	designation.
 *
 */

"use strict";

const $ = (selector) => document.querySelector(selector);

//  Declare and initialize program constants
const MINGUESS = 1;
const MAXGUESS = 100;
const NGM = "Non # Guess";
const GOOR = "Guess OOR";
const WTH = " was too high";
const WTL = " was too low";
const WC = " was correct";

//  Declare and initialize program variables
let randNum = 0;
let guess = 0;
let totGuesses = 0;
let isValid = true;
let theStatus = "";
let elem = "";

//  Determine guess validity
const examineGuess = () => {
  let timer = null;

  //  Check for no input
  if ($("#guess").value === "") {
    alert("No Guess Made!!!");
    $("#guess").nextElementSibling.textContent = NGM;

    timer = setTimeout(clearTheForm, 5000);

    return;
  }

  //  A numeric guess was made
  //  If random number not yet set,
  //  set the random number now.
  if (randNum === 0) {
    randNum = Math.floor(Math.random() * 100) + 1;
    alert("Test. The random number was: " + randNum);
  }

  //  Check the guess to make sure it is
  //  between 1 - 100 (a valid guess).
  guess = parseInt($("#guess").value);

  //  Range check
  if (guess < MINGUESS || guess > MAXGUESS) {
    //  Set error message
    $("#guess").nextElementSibling.textContent = GOOR;

    //  Set timer
    timer = setTimeout(clearTheForm, 5000);

    return;
  }

  //  A valid guess was made (>= 1 and <= 100)
  ++totGuesses;

  //  Call figureGuessStatus()
  figureGuessStatus();
};

const figureGuessStatus = () => {
  let timer = null;

  $("#guessStatus").value = guess;
  $("#totalGuesses").value = totGuesses;

  //  Check for too low
  if (guess < randNum) {
    $("#guessStatus").value += WTL;
    timer = setTimeout(clearTheForm, 5000);
    return;
  }
  //  Check for too high
  else if (guess > randNum) {
    $("#guessStatus").value += WTH;
    timer = setTimeout(clearTheForm, 5000);
    return;
  }
  //  Correct number was guessed
  else {
    $("#guessStatus").value += WC;
    showThePicture();
    timer = setTimeout(clearTheForm, 5000);
  }
};

const showThePicture = () => {
  elem = document.createElement("img");

  //  Check for expert designation
  if (totGuesses < 6) {
    alert("Expert");
    //  Set the picture
    elem.setAttribute("src", "images/expert.jpg");
  }
  //  Check for average designation
  else if (totGuesses < 11) {
    alert("Average");
    //  Set the picture
    elem.setAttribute("src", "images/average.jpg");
  }
  //  Check for novice designation
  else if (totGuesses > 11) {
    alert("Novice");
    //  Set the picture
    elem.setAttribute("src", "images/novice.jpg");
  }
  //  Check for unknown
  else {
    alert("Illegal");
    elem.setAttribute("src", "images/na.jpg");
  }

  document.getElementById("gameStatusPicture").appendChild(elem);
};

//  Clear form values
const clearTheForm = () => {
  $("#guess").value = "";
  $("#guessStatus").value = "";
  $("#guess").nextElementSibling.textContent = "";
  $("#gameStatusPicture").textContent = "";
  $("#guess").focus();
};

//  Code that runs when the
//  Start New Game button clicked.
const startNewGame = () => {
  //  Get a random number
  randNum = Math.floor(Math.random() * 100) + 1;
  alert("Test. The random number was: " + randNum);
  clearTheForm();
  $("#totalGuesses").value = "";
  totGuesses = 0;
};

//  Add eventListeners
document.addEventListener("DOMContentLoaded", () => {
  $("#clearForm").addEventListener("click", clearTheForm);
  $("#makeGuess").addEventListener("click", examineGuess);
  $("#newGame").addEventListener("click", startNewGame);

  $("#guess").focus();
});
