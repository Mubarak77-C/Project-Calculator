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
let currentOperate = '';
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