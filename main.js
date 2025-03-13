'use strict'

// Variable declarations
var randomDigits;
var scoreNum, highscoreNum;
var lastRangeValue;
var element;

// all selected elements
function elementSelectors() {
  return {
    // container
    main: selector('content'),
    rangeDropdown: selector("range-dropdown"),
    
    //Buttons variables
    btn1N20: selector("oneToTwenty", 'id'),
    btn1N50: selector("oneToFifty", 'id'),
    btn1N100: selector("oneToHundred", 'id'),
    btnCheck: selector("check"),
    btnPlayAgain: selector("play-again"),
    popUpCloseBtn: selector('close-btn'),
    gameInfoBtn: selector('game-info'),

    // overlays
    popUp: selector('pop-up'),
    popUpOverlay: selector('blur'),

    //text variables
    subHeading: selector("game-description"),
    hiddenNumber: selector('secret-number'),
    outputMessage: selector("message"),
    scoreValue: selector("score"),
    highScoreValue: selector("highscore"),
    inputBox: selector("guesses"),
  }
}

var feedback = {
  tooLow: "📉 Too low",
  tooHigh: "📈 Too high",
  outOfRange: `💥 Enter a number between 1 and ${lastRangeValue}`,
  gameOver: '😞🙄 Game over',
  victory: "🍾 Yayy!!! Correct number!", 
}

document.addEventListener('DOMContentLoaded', (e) => {
  onInit();
   element = elementSelectors();
   element.btnCheck.addEventListener('click', gameLogic);
   
   // main parent clicks
   element.main.addEventListener('click', (e) => {
    element.btn1N20.addEventListener('click', selectGameRange);

  })
  
});



// helper functions
var selector = (element, selectBy='class') => {
  if (selectBy == 'id') {
    return document.getElementById(element);
  }
  return document.querySelector('.' + element);
}

// on buttons
var inputFieldOn = function () {
  var inputBox = selector('guesses')
  inputBox.disabled = false;
  inputBox.value = '';
};
function btnCheckOn() {
  var btnCheck = selector('check')
  btnCheck.disabled = false;
};
var btnPlayAgainOn = function () {
  var btnPlayAgain = selector('play-again')
    btnPlayAgain.disabled = false;
}

//Off buttons
var inputFieldOff = function () {
  var inputBox = selector('guesses')
  inputBox.disabled = true;
};
var btnCheckOff = function () {
  var btnCheck = selector('check')
  btnCheck.disabled = true;
};
var btnPlayAgainOff = function () {
  var btnPlayAgain = selector('play-again')
    btnPlayAgain.disabled = true;
}

//feedback functionality
var displayFeedback = function (text) {
  var outputMessage = selector('message')
  outputMessage.textContent = text;
};

//game info and blur overlay functionality
var showModal = function () {
  var popUp = selector('pop-up')
  var popUpOverlay = selector('blur')
    popUp.classList.remove('hidden');
    popUpOverlay.classList.remove('hidden');
}
var closeModal = function () {
  var popUp = selector('pop-up')
  var popUpOverlay = selector('blur')
    popUp.classList.add('hidden');
    popUpOverlay.classList.add('hidden');
}

// disables button and input field on init or when game field has not been selected
var onInit = () => {
  inputFieldOff();
  btnCheckOff();
  btnPlayAgainOff();
}

// game Decision
var gameLogic = function() {
 
  var guessedNumber = document.querySelector(".guesses").value;

  //when no guess or guess is out of range
    if (guessedNumber || guessedNumber < 0 || guessedNumber > lastRangeValue) {
    // displayFeedback(feedback.outOfRange);
    displayFeedback(feedback.handleRangeValue(lastRangeValue));
    scoreNum--;
    element.scoreValue.textContent = scoreNum;
    if (scoreNum === 1) {
      displayFeedback(feedback.gameOver)
      scoreNum = scoreNum;
      element.scoreValue.textContent = scoreNum;
      element.hiddenNumber.style.boxShadow = '5px 3px 5px red';
    }
  } //when guess is correct
  else if (guessedNumber == randomDigits) {
    displayFeedback(feedback.victory);
    element.hiddenNumber.textContent = randomDigits;
    if (highscoreNum < scoreNum) {
      highscoreNum == scoreNum;
      element.highScoreValue.textContent = highscoreNum;
    }
    element.hiddenNumber.style.boxShadow = '5px 3px 5px #07f72b';
  } //when guess is wrong 
  else if (guessedNumber !== randomDigits) {
    displayFeedback(
      guessedNumber > randomDigits ? feedback.tooHigh : feedback.tooLow
    );
    scoreNum--;
    element.scoreValue.textContent = scoreNum;
    if (scoreNum < 1) {
      displayFeedback(feedback.gameOver)
      scoreNum = scoreNum;
      element.scoreValue.textContent = scoreNum;
      element.hiddenNumber.style.boxShadow = '5px 3px 5px red';
    }
  }
 
}

// /**--------------------------------------------Event functionality------------------------------------------------ */
//                               /*---------------------1 and 20---------------*/

var selectGameRange = function() {
  lastRangeValue = 20;
  element.subHeading.textContent = `between 1 and ${lastRangeValue}`;
  element.hiddenNumber.textContent = '?';

  inputFieldOn();
  btnCheckOn();
  btnPlayAgainOn();

  randomDigits = generateRandomNumber();  //try put this in a function and set the multiplier to lastRangeNumber
  scoreNum = 20;
  element.scoreValue.textContent = scoreNum;
  highscoreNum = 0;
  element.highScoreValue.textContent = 0;

  element.btnCheck.addEventListener('click', gameLogic);
  element.btnCheck.removeEventListener('click', gameLogic);

}

function generateRandomNumber() {
  randomDigits = Math.trunc(Math.random() * 20) + 1;
}