'use strict'

// Variable declarations
let randomDigits;
let scoreNum, highscoreNum;
let lastRangeValue;
let element;

document.addEventListener('DOMContentLoaded', (e) => {
  onInit();
  element = elementSelectors();
  element.btn1N20.addEventListener('click', chooseGame);
  // selector("oneToTwenty", 'id').addEventListener('click', chooseGame);
});

// all selected elements
const elementSelectors = () => {
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
const selector = (element, selectBy='class') => {
  if (selectBy === 'id') {
    return document.getElementById(element);
  }
  return document.querySelector('.' + element);
}

const inputFieldOn = function () {
  const inputBox = selector('guesses')
  inputBox.disabled = false;
  inputBox.value = '';
};
const btnCheckOn = function () {
  const btnCheck = selector('check')
  btnCheck.disabled = false;
};
const btnPlayAgainOn = function () {
  const btnPlayAgain = selector('play-again')
    btnPlayAgain.disabled = false;
}

//Off buttons
const inputFieldOff = function () {
  const inputBox = selector('guesses')
  inputBox.disabled = true;
};
const btnCheckOff = function () {
  const btnCheck = selector('check')
  btnCheck.disabled = true;
};
const btnPlayAgainOff = function () {
  const btnPlayAgain = selector('play-again')
    btnPlayAgain.disabled = true;
}

//text functionality
const outputMsgDisplay = function (text) {
  const outputMessage = selector('message')
  outputMessage.textContent = text;
};

//game info and blur overlay functionality
let showModal = function () {
  const popUp = selector('pop-up')
  const popUpOverlay = selector('blur')
    popUp.classList.remove('hidden');
    popUpOverlay.classList.remove('hidden');
}
const closeModal = function () {
  const popUp = selector('pop-up')
  const popUpOverlay = selector('blur')
    popUp.classList.add('hidden');
    popUpOverlay.classList.add('hidden');
}

const onInit = () => {
  inputFieldOff();
  btnCheckOff();
  btnPlayAgainOff();
  // showModal();
}

// game Decision
const gameLogic = function() {
 
  let guessedNumber = Number(document.querySelector(".guesses").value);

  //when no guess or guess is out of range
  if (!guessedNumber || guessedNumber < 0 || guessedNumber > lastRangeValue) {
    outputMsgDisplay(`💥 Enter a number between 1 and ${lastRangeValue}`);
    scoreNum--;
    element.scoreValue.textContent = scoreNum;
    if (scoreNum < 1) {
      outputMsgDisplay('😞🙄 Game over')
      scoreNum = 0;
      element.scoreValue.textContent = scoreNum;
      btnCheckOff();
      inputFieldOff();
      element.hiddenNumber.style.boxShadow = '5px 3px 5px red';
    }
  } //when guess is correct
  else if (guessedNumber === randomDigits) {
    outputMsgDisplay("🍾 Yayy!!! Correct number!");
    btnCheckOff();
    inputFieldOff();
    element.hiddenNumber.textContent = randomDigits;
    if (highscoreNum < scoreNum) {
      highscoreNum = scoreNum;
      element.highScoreValue.textContent = highscoreNum;
    }
    element.hiddenNumber.style.boxShadow = '5px 3px 5px #07f72b';
  } //when guess is wrong 
  else if (guessedNumber !== randomDigits) {
    outputMsgDisplay(
      guessedNumber > randomDigits ? "📈 Too high" : "📉 Too low"
    );
    scoreNum--;
    element.scoreValue.textContent = scoreNum;
    if (scoreNum < 1) {
      outputMsgDisplay('😞 Game over')
      scoreNum = 0;
      element.scoreValue.textContent = scoreNum;
      btnCheckOff();
      inputFieldOff();
      element.hiddenNumber.style.boxShadow = '5px 3px 5px red';
    }
  }
 
}

// /**--------------------------------------------Event functionality------------------------------------------------ */
//                               /*---------------------1 and 20---------------*/

const chooseGame = function() {
  const subHeading = selector('game-description');
  const hiddenNumber = selector('secret-number');
  const scoreValue = selector('score');
  const highScoreValue = selector('highscore');
  const btnCheck = selector('check');
  const btnPlayAgain = selector('play-again');

  lastRangeValue = 20;
  subHeading.textContent = `between 1 and ${lastRangeValue}`;
  hiddenNumber.textContent = '?';

  inputFieldOn();
  btnCheckOn();
  btnPlayAgainOn();

  randomDigits = Math.trunc(Math.random() * 20) + 1;  //try put this in a function and set the multiplier to lastRangeNumber
  scoreNum = 20;
  scoreValue.textContent = scoreNum;
  highscoreNum = 0;
  highScoreValue.textContent = 0;

  btnCheck.addEventListener('click', gameLogic);

  
  //Play again functionality
  btnPlayAgain.addEventListener('click', function() {
    randomDigits = Math.trunc(Math.random() * 20) + 1;
    hiddenNumber.textContent = '?';

    outputMsgDisplay('Start guessing...');

    scoreNum = 20;   //further examination
    scoreValue.textContent = scoreNum;

    hiddenNumber.style.boxShadow = 'none';

    inputFieldOn();
    btnCheckOn();

  })
}