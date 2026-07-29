// --- 1. Select DOM Elements ---
const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

// --- 2. State Variable for Current Input ---
let displayValue = '0';

// --- 3. Helper Function to Update the UI ---
function updateDisplay() {
  screen.textContent = displayValue;
}

// --- 4. Event Delegation on the Keys Container ---
keys.addEventListener('click', (event) => {
  const target = event.target;

  // Guard Clause: Exit if the click was not on a button element
  if (!target.matches('button')) {
    return;
  }

  // Handle Number Clicks
  if (target.dataset.number) {
    const number = target.dataset.number;
    inputNumber(number);
    updateDisplay();
    return;
  }
});

// --- 5. Logic for Inputting Numbers ---
function inputNumber(number) {
  // If the screen shows '0', replace it. Otherwise, append the number.
  if (displayValue === '0') {
    displayValue = number;
  } else {
    displayValue += number;
  }
}