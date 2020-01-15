// This file worked on 1/15/20 to do a basic 2 digit equation. I am going to re-work my logic and want to be able to easily test out my idea.

const numberButtons = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const operatorButtons = document.querySelectorAll('.operator');
// const equalButton = document.querySelector('.equal');
let displayNumber = '';
let currentOperator = ''; 
var variables = [];
let result = '';

function add(a, b) {
    // console.log('add ran');
    result = a + b;
    console.log(result);
    display.textContent = result;
}

function subtract(a, b) {
    result = a - b;
    // console.log(result);
    display.textContent = result;
}

function multiply(a, b) {
    result = a * b;
    display.textContent = result;
}

function divide(a, b) {
    if (b === 0) {
        alert("Can not divide by 0");
        display.textContent = '';
    } else {
        result = a / b;
    }
    display.textContent = result;
}

function operate([a, operator, b]) {
    a = +a;
    b = +b;
    // console.log([a, operator, b]);
    // console.log('operate ran');
    // console.log(operator);
    switch (operator) {
        case 'plus':
            // console.log('plus in operate ran');
            return add(a, b);
        case 'minus':
            return subtract(a, b);
        case 'times':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            break;
    }
}

function collectNumbers() {    
    // console.log(this.id);   
    switch(this.id) {
        case 'zero':
            displayNumber = displayNumber + '0';
            break;
        case 'nine':
            displayNumber = displayNumber + '9';
            break;
        case 'eight':
            displayNumber = displayNumber + '8';
            break;
        case 'seven':
            displayNumber = displayNumber + '7';
            break;
        case 'six':
            displayNumber = displayNumber + '6';
            break;
        case 'five':
            displayNumber = displayNumber + '5';
            break;
        case 'four':
            displayNumber = displayNumber + '4';
            break;
        case 'three':
            displayNumber = displayNumber + '3';
            break;
        case 'two':
            displayNumber = displayNumber + '2';
            break;
        case 'one':
            displayNumber = displayNumber + '1';
            break;
        case 'period':
            console.log('period is not working yet');
            break;
        default:
            console.log('default for collectNumbers');
            break;
        }
    display.textContent = displayNumber;
    // console.log(displayNumber);        
}

function collectOperator() {
    // console.log(displayNumber);
    // console.log(this.id);
    storeVariables(displayNumber);
    displayNumber = '';
    switch(this.id) {
        case 'clear':
            console.log('clear');
            break;
        case 'pos-neg':
            console.log('positive negative switch');
            break;
        case 'para':
            console.log('parenthesis');
            break;
        case 'clear':
            console.log('clear');
            break;
        case 'backspace':
            console.log('backspace');
            break;
        case 'plus':
            // currentOperator = 'plus';
            storeVariables('plus');
            break;
        case 'minus':
            // currentOperator = 'minus';
            storeVariables('minus');
            break;
        case 'times':
            // currentOperator = 'times';
            storeVariables('times');
            break;
        case 'divide':
            // currentOperator = 'divide';
            storeVariables('divide');
            break;
        case 'equals':
            return operate(variables);
            break;
        default:
            console.log('default for collectOperators');
            break;
    }
    // console.log(currentOperator);
    // storeVariables(currentOperator);
}

function storeVariables(a) {
    variables.push(a);
    console.log(variables);
}

numberButtons.forEach(numberButton => numberButton.addEventListener('click', collectNumbers))
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', collectOperator))
// equalButton.addEventListener('click', operate(variables));

// Not sure if this will be needed for this project
// function sum(array) {
// 	return array.reduce((total, current) => total + current, 0);
// }

// Not sure if I will need this to be in an array
// function multiply(array) {
//     if(!array.length){
//         return 0;
//     }
//     return array.reduce((accumulator, nextItem) => accumulator * nextItem);
// }

