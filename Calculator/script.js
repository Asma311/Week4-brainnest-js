const display = document.getElementById('display');
const clearButton = document.querySelector('.clear');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const decimalButton = document.querySelector('.decimal');

let leftOperand = null;
let operator = null;
let rightOperand = null;
let result = null;
let decimalPressed = false;

function clear() {
  leftOperand = null;
  operator = null;
  rightOperand = null;
  result = null;
  decimalPressed = false;
  display.textContent = '0';
}

function roundNumber(number) {
  const precision = 1000000;
  return Math.round(number * precision) / precision;
}

function operate() {
  if (rightOperand === null) {
    return; 
  }

  switch(operator) {
    case '+':
      result = leftOperand + rightOperand;
      break;
    case '-':
      result = leftOperand - rightOperand;
      break;
    case 'x':
      result = leftOperand * rightOperand;
      break;
    case '÷':
      result = leftOperand / rightOperand;
      break;
  }
  
  result = roundNumber(result);
  display.textContent = result.toString();
  
  // Set the state of the calculator for the next operation
  leftOperand = result;
  operator = null;
  rightOperand = null;
}

clearButton.addEventListener('click', clear);

decimalButton.addEventListener('click', () => {
  if (!decimalPressed) {
    decimalPressed = true;
    display.textContent += '.';
  }
});

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (operator) {
      if (!rightOperand) {
        rightOperand = parseFloat(button.textContent);
        display.textContent = rightOperand.toString();
      } else {
        rightOperand = parseFloat(display.textContent + button.textContent);
        display.textContent = rightOperand.toString();
      }
    } else {
      if (!leftOperand) {
        leftOperand = parseFloat(button.textContent);
        display.textContent = leftOperand.toString();
      } else {
        leftOperand = parseFloat(display.textContent + button.textContent);
        display.textContent = leftOperand.toString();
      }
    }
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (operator && rightOperand !== null) {
      operate();
    }
    operator = button.textContent;
    decimalPressed = false;
  });
});

equalsButton.addEventListener('click', () => {
  if (operator && rightOperand !== null) {
    operate();
  }
});

