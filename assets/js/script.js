var wins = 0;
var loses = 0;
var isPlaying = false;

var randWord = [];
var displayedArr = [];
var displayedArrHTML = [];
var correctGuesses = 0;
var timer = null;

var timeLeft = 10;
var timerEl = document.getElementById("countdown");
var wordBox = document.getElementById("first-box");
var winsEl = document.getElementById("wins");
var losesEl = document.getElementById("loses");

var words = ["apple", "orange", "peach", "banana", "rhino", "watermelon"];

var startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startBtnClick);
document.addEventListener("keypress", keyPressed);
var resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetBtnClick);

function resetBtnClick() {
    wins = 0;
    loses = 0;
    winsEl.innerHTML = wins;
    losesEl.innerHTML = loses;
    reset();
}

function keyPressed(event) {
    if(!isPlaying) {
        return;
    }

    var currKey = (event.key);

    if(randWord.includes(currKey)) {
        for(var i = 0; i < randWord.length; i++) {
            if(randWord[i] === currKey.toLowerCase() || randWord[i] === currKey.toUpperCase()) {
                displayedArr[i] = randWord[i];
                correctGuesses++;
            }
        }

        updateWord();
        if(correctGuesses === displayedArr.length) {
            winner();
        }
    }
}

function winner() {
    clearChildren();

    var winnerH2 = document.createElement("h2");
    winnerH2.innerHTML = "You Won!!!";
    wordBox.appendChild(winnerH2);

    wins++;
    reset();
}

function reset() {
    timeLeft = 10;
    timerEl.innerHTML = timeLeft;
    winsEl.innerHTML = wins;
    losesEl.innerHTML = loses;
    isPlaying = false;
    randWord = [];
    displayedArr = [];
    displayedArrHTML = [];
    correctGuesses = 0;
    clearInterval(timer);
    timer = null;
}

function updateWord() {
    for(var i = 0; i < displayedArrHTML.length; i++) {
        displayedArrHTML[i].innerHTML = displayedArr[i];
    }
}

function startBtnClick() {
    if(isPlaying) {
        return;
    } 

    wordBox.removeChild(wordBox.firstChild);

    // Getting a random word from words array and turning that word into a char array
    randWord = words[getRandBetween(0, words.length)];
    var charArr = randWord.split("");
    displayedArr = Array(charArr.length).fill('_');

    for(var i = 0; i < displayedArr.length; i++) {
        var newH2 = document.createElement("h2");
        newH2.innerHTML = displayedArr[i];
        wordBox.appendChild(newH2);
        displayedArrHTML.push(newH2);
    }

    timer = setInterval(countdown, 1000);

    isPlaying = true;
    console.log("Word is: " + randWord);
}

function countdown() {
    timeLeft--;
    timerEl.innerHTML = timeLeft;

    if(timeLeft === 0) {
        loses++;
        var newH2 = document.createElement("h2");
        newH2.innerHTML = "You Lost!"
        clearChildren();
        wordBox.appendChild(newH2);
        reset();
        clearInterval(timer);
    }  
}

function clearChildren() {
    while(wordBox.firstChild) {
        wordBox.removeChild(wordBox.firstChild);
    }
}

// Helper methods
function getRandBetween(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}