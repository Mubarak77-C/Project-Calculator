// ==========================================
// PHASE 1: The Math Engine
// ==========================================
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return "Error";
    return a / b;
};

const operate = (operator, a, b) => {
    const num1 = Number(a);
    const num2 = Number(b);
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return null;
    }
};

// ==========================================
// PHASE 2: State Management & Memory
// ==========================================
let firstNumber = '';
let currentOperator = '';
let secondNumber = '';
let displayValue = '0';

const appendNumber = (number) => {
    // Prevent multiple decimals in a single number
    if (number === '.' && displayValue.includes('.')) return;

    if (displayValue === '0' && number !== '.') {
        displayValue = number;
    } else {
        displayValue += number;
    }
};

const chooseOperator = (op) => {
    if (currentOperator !== '' && secondNumber !== '') {
        evaluate();
    }
    firstNumber = displayValue;
    currentOperator = op;
    displayValue = ''; 
    updateDisplay(); // ✅ Forces the screen to update right away!
};

const evaluate = () => {
    if (currentOperator === '' || firstNumber === '') return;
    secondNumber = displayValue;
    
    const result = operate(currentOperator, firstNumber, secondNumber);
    displayValue = String(result);
    
    firstNumber = displayValue;
    currentOperator = '';
    secondNumber = '';
};

const clearCalculator = () => {
    firstNumber = '';
    currentOperator = '';
    secondNumber = '';
    displayValue = '0';
};

const deleteNumber = () => {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0'; // Keeps screen at '0' instead of blank
    }
};

// ==========================================
// PHASE 3: Front-End UI & Event Delegation
// ==========================================
const displayScreen = document.getElementById('display');
const buttonsGrid = document.querySelector('.buttons-grid');

const updateDisplay = () => {
    displayScreen.textContent = displayValue;
};

// Click Event Listener
buttonsGrid.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('btn-num')) {
        appendNumber(target.dataset.num);
        updateDisplay();
    }
    if (target.classList.contains('btn-operator')) {
        chooseOperator(target.dataset.op);
    }
    if (target.classList.contains('btn-equals')) {
        evaluate();
        updateDisplay();
    }
    if (target.classList.contains('btn-clear')) {
        clearCalculator();
        updateDisplay();
    }
});

// ==========================================
// EXTRA CREDIT: Physical Keyboard Support
// ==========================================
window.addEventListener('keydown', (e) => {
    // Unfocus buttons so Enter/Space don't trigger click events repeatedly
    document.activeElement.blur();

    // Numbers and Decimal Point
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
        updateDisplay();
    }
    // Operators (+, -, *, /)
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperator(e.key);
    }
    // Equals (Enter key or '=' key)
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); 
        evaluate();
        updateDisplay();
    }
    // Backspace for deleting last digit
    if (e.key === 'Backspace') {
        deleteNumber();
        updateDisplay();
    }
    // Escape key to clear (AC)
    if (e.key === 'Escape') {
        clearCalculator();
        updateDisplay();
    }
});