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

//Variable to hold how many rounds will be played
const rounds = 3;

//Variables to keep track of player/computer scores and total, as well as Rounds played, and the Winner
//Variables for player score and total score
let playerScore = 0;
let playerTotal = 0;

//Variables for computer score and total score
let compScore = 0;
let compTotal = 0;

//Variables to track round and winner
let winner = '';
let round = 0;

/*
Dice Object, takes 1 parameter (color) as there will be 2 different dice. Black dice for the Player and Red dice for the Computer.
Has 3 attributes, sides to hold the values of each side of the dice, 
currentSide to identify the side that's face up, and color to identify the dice color.
*/
class Dice {
    constructor(color){
        this.sides = [1, 2, 3, 4, 5, 6];
        this.currentSide = 0;
        this.color = color;
    }

    describeSelf(){
        return `<img src="images/${this.color}_${this.currentSide}.png" alt="${this.color} Dice Value: ${this.currentSide}">`;
    }
}

//Dice Function Roll, uses Math.random() to determine which side of the dice to show
Dice.prototype.roll = function(){
    let result = Math.round(Math.random() * (this.sides.length - 1));

    this.currentSide = this.sides[result];

    return this.currentSide;
}

/*
Function to calculate the score when two dice are rolled and return the score.
If either diceVal1 or diceVal2 is 1, then the score returned is 0. 
If diceVal1 and diceVal2 are the same value, then the score returned is (diceVal1 + diceVal2) * 2.
For any other roll, the score returned is diceVal1 + diceVal2.
*/
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

/*
When Roll Dice button is clicked, roll a pair of dice for the player and computer if round is < rounds.
Dice images change to reflect player rolls and computer rolls.
Round and total scores calculated and updated.
When 3 rounds have been played, the winner is determined and displayed.
*/
rollBtn.addEventListener('click', function(){

    if(round < rounds){
        round++;
        $round.html(`Round: ${round}`);

        let playerResult1 = playerDice1.roll();
        let playerResult2 = playerDice2.roll();
        let compResult1 = compDice1.roll();
        let compResult2 = compDice2.roll();

        $playerDice.fadeOut(200, function(){
            $playerDice.html(`${playerDice1.describeSelf()} ${playerDice2.describeSelf()}`);
        }).fadeIn(200);
        
        $compDice.fadeOut(200, function(){
            $compDice.html(`${compDice1.describeSelf()} ${compDice2.describeSelf()}`);
        }).fadeIn(200);
        
        playerScore = calculateScore(playerResult1, playerResult2);
        compScore = calculateScore(compResult1, compResult2);

        playerTotal += playerScore;
        compTotal += compScore;

        //background color of score highlighted to show who won the round. If the scores are the same, no score highlighted.
        if(playerScore > compScore){
            $playerRoundScore.css('background-color', 'lightgreen');
            $compRoundScore.css('background-color', '');
        }else if(playerScore == compScore){
            $playerRoundScore.css('background-color', '');
            $compRoundScore.css('background-color', '');
        }else{
            $compRoundScore.css('background-color', 'lightgreen');
            $playerRoundScore.css('background-color', '');
        }
    
        //background color of total score highlighted to show is currently winning. If the total scores are the same, no total highlighted.
        if(playerTotal > compTotal){
            $playerTotalScore.css('background-color', 'lightgreen');
            $compTotalScore.css('background-color', '');
        }else if(playerTotal == compTotal){
            $compTotalScore.css('background-color', '');
            $playerTotalScore.css('background-color', '');
        }else{
            $compTotalScore.css('background-color', 'lightgreen');
            $playerTotalScore.css('background-color', '');
        }
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
        $result.html(`Winner: ${winner}`);
        $result.css('background', '#F2DCB3')
    }
});

//When the Reset Game button is clicked, reset game and values.
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

    //reset highlights
    $playerRoundScore.css('background-color', '');
    $compRoundScore.css('background-color', '');
    $playerTotalScore.css('background-color', '');
    $compTotalScore.css('background-color', '');
    $result.css('background', '')
});