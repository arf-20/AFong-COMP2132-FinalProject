//Locate nodes
const $playerRoundScore = $('#playerScore');
const $playerTotalScore = $('#playerTotal');
const $playerDice = $('#playerDice');
const $compRoundScore = $('#computerScore');
const $compTotalScore = $('#computerTotal');
const $compDice = $('#computerDice');
const $round = $('#round');
const $result = $('#result');
const defaultPlayerDice = "images/black_1.png";
const defaultCompDice = "images/red_1.png";

const rollBtn = document.getElementById('roll');
const resetBtn = document.getElementById('reset');

//Variables to keep track of player/computer scores and total, as well as Rounds played and the Winner
const rounds = 3;
let playerRoll = 0;
let playerScore = 0;
let playerTotal = 0;
let compRoll = 0;
let compScore = 0;
let compTotal = 0;
let winner = '';
let round = 0;

class Dice {
    constructor(color){
        this.sides = [1, 2, 3, 4, 5, 6];
        this.currentSide = 0;
        this.color = color;
    }

    describeSelf(){
        return `<img src="images/${this.color}_${this.currentSide}.png" alt="${this.color} Dice. Value: ${this.currentSide}">`;
    }
}

Dice.prototype.roll = function(){
    let result = Math.round(Math.random() * (this.sides.length - 1));

    this.currentSide = this.sides[result];

    return this.currentSide;
}

//Function to calculate the score when two dice are rolled
function calculateScore(diceVal1, diceVal2){
    let score;

    if(diceVal1 === 1 || diceVal2 === 1){
        score = 0;
    }else if(diceVal1 === diceVal2){
        score = (diceVal1 + diceVal2) * 2;
    }else{
        score = diceVal1 + diceVal2;
    }

    return score;
}