# 🧮 Vanilla JS Calculator

A clean, responsive, beginner-friendly web calculator built using pure HTML5, CSS3, and modern Vanilla JavaScript (ES6+). No external libraries or frameworks required.

This project was built as part of a step-by-step modular web development curriculum, focusing on DOM manipulation, state management, event handling, and defensive programming.

---

## 🎯 Key Technical Concepts Learned

- **DOM Selection & Event Delegation:** Attaching a single `click` event listener on the calculator keys parent container (`.calculator-keys`) to handle all button presses via event bubbling.
- **State Management:** Tracking operands, active operators, and UI boolean flags (`waitingForSecondOperand`) in a centralized JavaScript state object.
- **Separation of Concerns:** Using HTML5 `data-*` attributes (`data-number`, `data-action`, `data-value`) to decouple logic handling from visual CSS styling.
- **Floating-Point Precision:** Preventing floating-point arithmetic quirks (e.g., `0.1 + 0.2 = 0.30000000000000004`) using `parseFloat(result.toFixed(7))`.
- **Defensive Guard Clauses:** Safeguarding against division by zero (`X / 0` -> `"Error"`) and preventing invalid string inputs (such as multiple decimal points).

---

## 📂 Project Structure

calculator-app/
├── index.html        # Semantic HTML skeleton & data attribute hooks
├── style.css         # CSS Grid layout, flex alignment & color scheme
├── script.js         # Core calculator state & math evaluation logic
└── README.md         # Project documentation & overview

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   git clone https://github.com/YOUR-ORG-NAME/vanilla-js-calculator.git
   
2. **Navigate into the directory:**
   cd vanilla-js-calculator
   
3. **Open `index.html` in your browser:**
   Double-click `index.html` or use the VS Code Live Server extension.

---

## 🗺️ Git Commit Roadmap

1. `feat: setup HTML skeleton and layout elements`
2. `style: add CSS grid layout and UI styling`
3. `feat: implement DOM selection and number display updates`
4. `feat: add operator handling and state management`
5. `feat: complete equals button evaluation logic`
6. `feat: add clear, delete, and decimal validation`
7. `fix: handle division by zero and multi-operator edge cases`

---

## 🤝 Educational Purpose

This repository serves as an open starter kit and reference guide for web development students learning foundational JavaScript fundamentals before transitioning to modern JavaScript frameworks.