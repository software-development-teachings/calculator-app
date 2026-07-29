// --- 1. Select DOM Elements ---
const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

// --- 2. Calculator State Management ---
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// --- 3. Helper Function to Update the UI ---
function updateDisplay() {
  screen.textContent = calculator.displayValue;
}

updateDisplay();

// --- 4. Event Delegation on the Keys Container ---
keys.addEventListener('click', (event) => {
  const target = event.target;

  // Guard Clause: Exit if the click was not on a button
  if (!target.matches('button')) {
    return;
  }

  // Handle Number Clicks
  if (target.dataset.number) {
    inputNumber(target.dataset.number);
    updateDisplay();
    return;
  }

  // Handle Operator Clicks (+, -, *, /)
  if (target.dataset.action === 'operator') {
    handleOperator(target.dataset.value);
    updateDisplay();
    return;
  }

  // Handle Equals / Calculate Click (=)
  if (target.dataset.action === 'calculate') {
    handleEquals();
    updateDisplay();
    return;
  }
});

// --- 5. Logic for Inputting Numbers ---
function inputNumber(number) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand) {
    // Overwrite the screen with the new number when typing the second operand
    calculator.displayValue = number;
    calculator.waitingForSecondOperand = false;
  } else {
    // Append number or replace initial '0'
    calculator.displayValue = displayValue === '0' ? number : displayValue + number;
  }
}

// --- 6. Logic for Operator Handling ---
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  // If an operator is already clicked, allow changing it before entering the second number
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  // Store first operand if it's null
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    // Perform intermediate calculation if user chains operations (e.g., 5 + 3 + 2)
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

// --- 7. Logic for Equals Click (=) ---
function handleEquals() {
  const { firstOperand, displayValue, operator } = calculator;
  const secondOperand = parseFloat(displayValue);

  // Only calculate if we have a valid operator and first operand stored
  if (operator && firstOperand !== null) {
    const result = calculate(firstOperand, secondOperand, operator);

    // Rounding to max 7 decimals prevents floating point issues like 0.1 + 0.2 = 0.30000000000000004
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = true;
  }
}

// --- 8. Basic Math Helper Function ---
function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') return firstOperand + secondOperand;
  if (operator === '-') return firstOperand - secondOperand;
  if (operator === '*') return firstOperand * secondOperand;
  if (operator === '/') return firstOperand / secondOperand;

  return secondOperand;
}