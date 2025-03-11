'use strict'

// Variable declarations
var randomDigits;
var scoreNum, highscoreNum;
var lastRangeValue;
var element;

document.addEventListener('DOMContentLoaded', (e) => {
  onInit();
  element = elementSelectors();
  element.btn1N20.addEventListener('click', chooseGame);
  element.btnCheck.addEventListener('click', gameLogic);
  // selector("oneToTwenty", 'id').addEventListener('click', chooseGame);
});

// all selected elements
function elementSelectors() {
  return {
    //Buttons variables
    btn1N20: selector("oneToTwenty", 'id'),
    btn1N50: selector("oneToFifty", 'id'),
    btn1N100: selector("oneToHundred", 'id'),
    btnCheck: selector("check"),
    btnPlayAgain: selector("play-again"),

    popUp: selector('pop-up'),
    popUpOverlay: selector('blur'),
    popUpCloseBtn: selector('close-btn'),
    gameInfoBtn: selector('game-info'),

    //text variables
    subHeading: selector("game-description"),
    hiddenNumber: selector('secret-number'),
    outputMessage: selector("message"),
    scoreValue: selector("score"),
    highScoreValue: selector("highscore"),
    inputBox: selector("guesses"),
  }
}


// helper functions
var selector = (element, selectBy='class') => {
  if (selectBy == 'id') {
    return document.getElementById(element);
  }
  return document.querySelector('.' + element);
}

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

//text functionality
var outputMsgDisplay = function (text) {
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
  // showModal();
}

// game Decision
var gameLogic = function() {
 
  var guessedNumber = document.querySelector(".guesses").value;

  //when no guess or guess is out of range
    if (guessedNumber || guessedNumber < 0 || guessedNumber > lastRangeValue) {
    outputMsgDisplay(`💥 Enter a number between 1 and ${lastRangeValue}`);
    scoreNum--;
    element.scoreValue.textContent = scoreNum;
    if (scoreNum < 1) {
      outputMsgDisplay('😞🙄 Game over')
      scoreNum = scoreNum;
      element.scoreValue.textContent = scoreNum;
      element.hiddenNumber.style.boxShadow = '5px 3px 5px red';
    }
  } //when guess is correct
  else if (guessedNumber == randomDigits) {
    outputMsgDisplay("🍾 Yayy!!! Correct number!");
    element.hiddenNumber.textContent = randomDigits;
    if (highscoreNum < scoreNum) {
      highscoreNum == scoreNum;
      element.highScoreValue.textContent = highscoreNum;
    }
    element.hiddenNumber.style.boxShadow = '5px 3px 5px #07f72b';
  } //when guess is wrong 
  else if (guessedNumber !== randomDigits) {
    console.log('when guessed number is not equal to random digit');
    outputMsgDisplay(
      guessedNumber > randomDigits ? "📈 Too high" : "📉 Too low"
    );
    scoreNum--;
    element.scoreValue.textContent = scoreNum;
    if (scoreNum < 1) {
      outputMsgDisplay('😞 Game over')
      scoreNum = scoreNum;
      element.scoreValue.textContent = scoreNum;
      element.hiddenNumber.style.boxShadow = '5px 3px 5px red';
    }
  }
 
}

// /**--------------------------------------------Event functionality------------------------------------------------ */
//                               /*---------------------1 and 20---------------*/

var chooseGame = function() {
  console.log('calling choose game function');
  lastRangeValue = 20;
  element.subHeading.textContent = `between 1 and ${lastRangeValue}`;
  element.hiddenNumber.textContent = '?';

  inputFieldOn();
  btnCheckOn();
  btnPlayAgainOn();

  randomDigits = Math.trunc(Math.random() * 20) + 1;  //try put this in a function and set the multiplier to lastRangeNumber
  scoreNum = 20;
  element.scoreValue.textContent = scoreNum;
  highscoreNum = 0;
  element.highScoreValue.textContent = 0;

  element.btnCheck.addEventListener('click', gameLogic);

  
  //Play again functionality
  element.btnPlayAgain.addEventListener('click', function() {
    randomDigits = Math.trunc(Math.random() * 20) + 1;
    element.hiddenNumber.textContent = '?';

    outputMsgDisplay('Start guessing...');

    scoreNum = 20;   //further examination
    element.scoreValue.textContent = scoreNum;

    element.hiddenNumber.style.boxShadow = 'none';

    inputFieldOn();
    btnCheckOn();

  })
}