const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const rawDisplay = document.querySelector('.raw-display');
let displayNumber = '';
let rawData = '';
// const equalButton = document.querySelector('.equal');
// let result = '';

function add(a, b) {
    result = a + b;
}

function subtract(a, b) {
    result = a - b;
}

function multiply(a, b) {
    result = a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Can not divide by 0");
        display.textContent = '';
    } else {
        result = a / b;
    }
}

function collectData() {    
    // console.log(this.id);   
    switch(this.id) {
        case 'zero':
            displayNumber = displayNumber + '0';
            rawData = rawData + '0';
            break;
        case 'nine':
            displayNumber = displayNumber + '9';
            rawData = rawData + '9';
            break;
        case 'eight':
            displayNumber = displayNumber + '8';
            rawData = rawData + '8';
            break;
        case 'seven':
            displayNumber = displayNumber + '7';
            rawData = rawData + '7';
            break;
        case 'six':
            displayNumber = displayNumber + '6';
            rawData = rawData + '6';
            break;
        case 'five':
            displayNumber = displayNumber + '5';
            rawData = rawData + '5';
            break;
        case 'four':
            displayNumber = displayNumber + '4';
            rawData = rawData + '4';
            break;
        case 'three':
            displayNumber = displayNumber + '3';
            rawData = rawData + '3';
            break;
        case 'two':
            displayNumber = displayNumber + '2';
            rawData = rawData + '2';
            break;
        case 'one':
            displayNumber = displayNumber + '1';
            rawData = rawData + '1';
            break;
        case 'period':
            console.log('period is not working yet');
            break;
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
            if (isDoubleOperator() === false) {
                rawData = rawData + ' + ';
            }
            displayNumber = '';
            break;
        case 'minus':
            if (isDoubleOperator() === false) {
                rawData = rawData + ' - ';
            }
            displayNumber = '';
            break;
        case 'times':
            if (isDoubleOperator() === false) {
                rawData = rawData + ' * ';
            }
            displayNumber = '';
            break;
        case 'divide':
            if (isDoubleOperator() === false) {
                rawData = rawData + ' / ';
            }
            displayNumber = '';
            break;
        case 'equals':
            console.log('equal button was clicked')
            break;
        default:
            console.log('default for collectNumbers');
            break;
        }
    display.textContent = displayNumber;
    rawDisplay.textContent = rawData;
    console.log(rawData);        
}

// Check to see if user clicks two math operators back to back (for example: + - )
function isDoubleOperator() {
    if (rawData.charAt(rawData.length - 1).match(/\d/)) {
        return false;
    } else {
        alert('Please enter a number. You can not choose two math operators')
    }
}

calcButtons.forEach(calcButton => calcButton.addEventListener('click', collectData))

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

// ORDER OF OPERATIONS:
// Parentheses (simplify inside 'em)
// Exponents
// Multiplication and Division (from left to right)
// Addition and Subtraction (from left to right)

// rawData with 2 multiplication signs
// let rawData = '10+3*12-6*4'

// let rawData = '10+3*12/6-4'
// rawData should equal 12

// let timesData = new RegEx('/d+)\*(/d+)/', 'g');
// rawData.match(timesData);

function multiplyData([a, b]) {
    // console.log(a * b);
    // display.textContent = result;
    return a * b;
}

function calcData() { 
    // NEED TO DO LEFT TO RIGHT, so FIND MULT OR DIV THEN DECIDE
    // Need to do one match symbol at a time
    console.log(rawData);
    // Step 1: Define the Regex Pattern to Find - and keep for .replace 
    let timesRegExp = /\d+\*\d+/;
    // Step 2: Define what matches the regex
    let timesMatch = rawData.match(timesRegExp);
    // console.log(timesMatch);
    // Step 3: Turn the matched pattern into a string and split it at the match symbol
    let timesString = timesMatch.toString().split('*');
    // console.log(timesString);
    // Step 4: Multiply the two digits on each side of the symbol
    timesResult = multiplyData(timesString);
    // console.log(timesFinal);
    // Step 5: Replace raw data with the result of the multiplication
    // NEED BETTER NAME!!!
    let noTimesData = timesRegExp[Symbol.replace](rawData, timesResult)
    console.log(noTimesData);
}

// calcData();

// Want to make sure it works with periods!!!

let rawDataTest = '10+3*1.2/6-4'
function calcDataTest() { 
    // NEED TO DO LEFT TO RIGHT, so FIND MULT OR DIV THEN DECIDE
    // Need to do one match symbol at a time
    console.log(rawDataTest);
    // Step 1: Define the Regex Pattern to Find - and keep for .replace 
    let timesRegExp = /\d+\.?\d?\*\d+\.?\d?/;
    // Step 2: Define what matches the regex
    let timesMatch = rawDataTest.match(timesRegExp);
    console.log(timesMatch);
    // Step 3: Turn the matched pattern into a string and split it at the match symbol
    let timesString = timesMatch.toString().split('*');
    // console.log(timesString);
    // Step 4: Multiply the two digits on each side of the symbol
    timesResult = multiplyData(timesString);
    // console.log(timesFinal);
    // Step 5: Replace raw data with the result of the multiplication
    // NEED BETTER NAME
    let noTimesData = timesRegExp[Symbol.replace](rawDataTest, timesResult)
    console.log(noTimesData);
    // Will need to limit the length of the number
}

calcDataTest();


