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

  // Clear (AC) should always work, even in Error state
  if (target.dataset.action === 'clear') {
    resetCalculator();
    updateDisplay();
    return;
  }

  // Guard Clause: If in Error state, block all inputs until Clear (AC) is pressed
  if (calculator.displayValue === 'Error') {
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

  // Handle Decimal Click (.)
  if (target.dataset.action === 'decimal') {
    inputDecimal();
    updateDisplay();
    return;
  }

  // Handle Delete / Backspace Click (DEL)
  if (target.dataset.action === 'delete') {
    handleDelete();
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

// --- 6. Logic for Inputting Decimal ---
function inputDecimal() {
  // If waiting for second operand, clicking '.' should start a new decimal number '0.'
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }

  // Prevent multiple decimals in a single number (e.g., prevents "5.2.1")
  if (!calculator.displayValue.includes('.')) {
    calculator.displayValue += '.';
  }
}

// --- 7. Logic for Clear (AC) ---
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// --- 8. Logic for Delete / Backspace (DEL) ---
function handleDelete() {
  // Ignore backspace if waiting for a second operand
  if (calculator.waitingForSecondOperand) {
    return;
  }

  // Remove the last character. If only one character remains, reset to '0'
  if (calculator.displayValue.length > 1) {
    calculator.displayValue = calculator.displayValue.slice(0, -1);
  } else {
    calculator.displayValue = '0';
  }
}

// --- 9. Logic for Operator Handling ---
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  // Allow switching operators before typing the second number (e.g., user hits + then changes to -)
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
    
    if (result === 'Error') {
      calculator.displayValue = 'Error';
      calculator.firstOperand = null;
      calculator.operator = null;
      calculator.waitingForSecondOperand = false;
      return;
    }

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

// --- 10. Logic for Equals Click (=) ---
function handleEquals() {
  const { firstOperand, displayValue, operator } = calculator;
  const secondOperand = parseFloat(displayValue);

  // Only calculate if we have a valid operator and first operand stored
  if (operator && firstOperand !== null) {
    const result = calculate(firstOperand, secondOperand, operator);

    if (result === 'Error') {
      calculator.displayValue = 'Error';
    } else {
      // Rounding to max 7 decimals prevents floating point precision bugs
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    }

    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = true;
  }
}

// --- 11. Basic Math Helper Function with Zero Guard ---
function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') return firstOperand + secondOperand;
  if (operator === '-') return firstOperand - secondOperand;
  if (operator === '*') return firstOperand * secondOperand;

  if (operator === '/') {
    // Guard against division by zero
    if (secondOperand === 0) {
      return 'Error';
    }
    return firstOperand / secondOperand;
  }

  return secondOperand;
}