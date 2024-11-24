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