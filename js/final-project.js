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

/* 
Instantiate 2 Dice Objects for the Player
and 2 Dice Objects for the Computer
*/
let playerDice1 = new Dice("black");
let playerDice2 = new Dice("black");
let compDice1 = new Dice("red");
let compDice2 = new Dice("red");


rollBtn.addEventListener('click', function(){

    if(round < rounds){
        round++;
        $round.html(`Round: ${round}`);

        let playerResult1 = playerDice1.roll();
        let playerResult2 = playerDice2.roll();
        let compResult1 = compDice1.roll();
        let compResult2 = compDice2.roll();

        $playerDice.html(`${playerDice1.describeSelf()} ${playerDice2.describeSelf()}`);
        $compDice.html(`${compDice1.describeSelf()} ${compDice2.describeSelf()}`);
        
        playerScore = calculateScore(playerResult1, playerResult2);
        compScore = calculateScore(compResult1, compResult2);

        playerTotal += playerScore;
        compTotal += compScore;
    }else{

    }

    $playerRoundScore.html(`Round Score: ${playerScore}`);
    $playerTotalScore.html(`Total Score: ${playerTotal}`);
    $compRoundScore.html(`Round Score: ${compScore}`);
    $compTotalScore.html(`Total Score: ${compTotal}`);

    if(round === 3){
        if(playerTotal > compTotal){
            winner = 'Player';
        }else{
            winner = 'Computer';
        }
    }
    $result.html(`Winner: ${winner}`);
});

//Code to reset the game and values
resetBtn.addEventListener('click', function(){
    //reset variables to default values
    playerScore = 0;
    playerTotal = 0;
    compScore = 0;
    compTotal = 0;
    round = 0;
    winner = '';

    //update html to display default values and restore dice images to default
    $playerRoundScore.html(`Round Score: ${playerScore}`);
    $playerTotalScore.html(`Total Score: ${playerTotal}`);
    $compRoundScore.html(`Round Score: ${compScore}`);
    $compTotalScore.html(`Total Score: ${compTotal}`);
    $round.html(`Round: ${round}`);
    $result.html(`Winner: ${winner}`);
    $('#playerDice img').attr('src', defaultPlayerDice);
    $('#computerDice img').attr('src', defaultCompDice);
});