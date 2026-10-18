console.log('hi')

//phase 1. Arithmetic operator function doing
const add = (a, b) => {
    return a + b;
}
console.log(add(2, 2))

const substract = (a, b) => {
    return a - b;
}
console.log(substract(4, 2))

const multiply = (a, b) => {
    return a * b;
}
console.log(multiply(2, 2))

// const division = (a,b)=>{
// if (a/0){console.log("Infinity number:any number can't divide by 0")}
// else if (0/0){console.log("Not a number")}
// return a/b;
// }
// console.log(division(4,2))

const division = (a, b) => {
    if (b === 0) {
        // console.log("Nope! Can't divide by 0") // Catch the error cleanly
        return "Error"; // Safely catch division by zero without crashing
    }
    return a / b;
}
console.log(division(4, 0))

//##phase 1a : Master controller 
console.log("##Master controller ##")
const operate = (operator, a, b) => {
    const num1 = Number(a);
    const num2 = Number(b);

    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return division(num1, num2);
        default:
            return null;

    }
};
// Quick Console Tests
console.log(operate('+', 10, 5)); // Expected: 15
console.log(operate('-', 10, 5)); // Expected: 5
console.log(operate('*', 10, 5)); // Expected: 50
console.log(operate('/', 10, 2)); // Expected: 5
console.log(operate('/', 10, 0)); // Expected: "Error"

//phase 2: State Management

let firstNumber = '';
let currentOperator = '';
let secondNumber = '';
let displayValue = '0'; //what currently display on screen 

// A simple function to simulate pressing a number button
const appendNumber = (number) => {
    if (displayValue === '0') {
        displayValue = number; // Replace the initial 0

    } else {
        displayValue += number; // Append the number if something is already there
    }
    console.log("Current Screen ", displayValue);
};

appendNumber('5'); // Screen should say "5"
appendNumber('3'); // Screen should say "53"

//## phase 3 Adding Operator, Evaluate, and Clear Logic
// When user clicks an operator (+, -, *, /)
const chooseOperator = (op) => {
    // If we already have a first number and a current operator, 
    // evaluate what we have so far (allows chaining like 5 + 5 + 5)
    if (currentOperator !== '' && secondNumber !== '') {
        evaluate();
    }

    firstNumber = displayValue;
    currentOperator = op;
    displayValue = ''; // Clear screen for the second number
    console.log(`Saved First Number: ${firstNumber}, Operator: ${currentOperator}`);
};

// When user clicks equals (=)
const evaluate = () => {
    if (currentOperator === '' || firstNumber === '') return;
    
    secondNumber = displayValue;
    
    // Call our Phase 1 'operate' function!
    const result = operate(currentOperator, firstNumber, secondNumber);
    
    displayValue = String(result);
    console.log(`Result: ${displayValue}`);
    
    // Reset for the next calculation
    firstNumber = displayValue;
    currentOperator = '';
    secondNumber = '';
};

// When user clicks Clear (AC)
const clearCalculator = () => {
    firstNumber = '';
    currentOperator = '';
    secondNumber = '';
    displayValue = '0';
    console.log("Calculator cleared!");
};

//console to run test 
appendNumber('5');
chooseOperator('+');
appendNumber('3');
evaluate();

//phase 4: connecting Event Lsitener (THE FRONT END GLUE)-DELEGATION INSTEAD 20 EVENTLISTENR ADDING

// Grab the display element from HTML
const displayScreen = document.getElementById('display');
const buttonsGrid = document.querySelector('.buttons-grid');

// Helper to update what the user physically sees on the screen
const updateDisplay = () => {
    displayScreen.textContent = displayValue;
};

// Event Delegation on the container box
buttonsGrid.addEventListener('click', (event) => {
    const target = event.target;

    // 1. If they clicked a number button
    if (target.classList.contains('btn-num')) {
        appendNumber(target.dataset.num);
        updateDisplay();
    }

    // 2. If they clicked an operator button
    if (target.classList.contains('btn-operator')) {
        chooseOperator(target.dataset.op);
    }

    // 3. If they clicked equals
    if (target.classList.contains('btn-equals')) {
        evaluate(); // (or call calculateResult())
        updateDisplay();
    }

    // 4. If they clicked clear
    if (target.classList.contains('btn-clear')) {
        clearCalculator();
        updateDisplay();
    }
});