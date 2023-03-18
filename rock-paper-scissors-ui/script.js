let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('button');
const resultDiv = document.querySelector('#result');
const scoreDiv = document.querySelector('#score');

function computerPlay() {
  let plays = ['rock', 'paper', 'scissors'];
  let randomNum = Math.floor(Math.random() * 3);
  return plays[randomNum];
}

function playRound(playerSelection, computerSelection) {
  let result;
  
  switch (playerSelection + computerSelection) {
    case 'rockrock':
    case 'paperpaper':
    case 'scissorsscissors':
      result = 'Its a tie';
      break;
    case 'rockscissors':
    case 'paperrock':
    case 'scissorspaper':
      result = `You win! ${playerSelection} beats ${computerSelection}.`;
      playerScore++;
      break;
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      result = `You lose! ${computerSelection} beats ${playerSelection}.`;
      computerScore++;
      break;
  }
    
  const computerSelectionDiv = document.querySelector('#computer-selection');
  computerSelectionDiv.textContent = `Computer chose  ${computerSelection}.`;
  
  resultDiv.textContent = result;
  scoreDiv.textContent = `Score: You  ${playerScore} - Computer  ${computerScore}`;

  if (playerScore === 5) {
    resultDiv.textContent = 'You win the game!';
    disableButtons();
  } else if (computerScore === 5) {
    resultDiv.textContent = 'You lose the game!';
    disableButtons();
  }
}

buttons.forEach(button => {
    button.style.background = '#590f70';
    button.style.color = 'white';
    button.style.padding = '10px 20px';
    button.style.borderRadius = '5px';
    button.style.border = 'white';
    button.style.radius = '15px';
    button.style.fontSize = '15px';
    button.style.fontWeight = '400';
  });

const body = document.querySelector('body');
body.style.display = 'flex';
body.style.justifyContent = 'center';
body.style.alignItems = 'center';
body.style.flexDirection = 'column';

function disableButtons() {
  buttons.forEach(button => {
    button.disabled = true;
  });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    playRound(button.id, computerPlay());
  });
});