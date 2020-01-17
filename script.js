const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const rawDisplay = document.querySelector('.raw-display');
const warning = document.querySelector('.warning')
let displayNumber = '';
let rawData = '';
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
    result = a / b;
}

function factorial(a) {
	if (a == 0) return 1;
	let product = 1;
	for (let i = a; i > 0; i--) {
	  product *= i;
	}
	return product;
}

function exponent(a, b) {
	return Math.pow(a, b);
}

function collectData() {    
    // console.log(this.id);
    warning.textContent = '';   
    switch(this.id) {
        case 'zero':
            if (hasPreviousFactorial() === false && hasDivision() === false ) {
                displayNumber = displayNumber + '0';
            } else {
                warning.textContent = `You can not enter '0' directly after a division or factorial sign`;
            }
            break;
        case 'nine':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '9';
            }
            break;
        case 'eight':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '8';
            }
            break;
        case 'seven':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '7';
            }
            break;
        case 'six':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '6';
            }
            break;
        case 'five':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '5';
            }
            break;
        case 'four':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '4';
            }
            break;
        case 'three':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '3';
            }
            break;
        case 'two':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '2';
            }
            break;
        case 'one':
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '1';
            }
            break;
        case 'period':
            if (displayNumber.length == 0 && hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '0.';
            } else if (hasPreviousFactorial() === false && hasPreviousPeriod() === false && hasExponent() === false) {
                displayNumber = displayNumber + '.';
            } else {
                warning.textContent = "To use a decimal point, you can not have another decimal point, factorial, or exponent";
            }
            break;
        case 'clear':
            let clearConfirm = confirm('Are you sure you want to clear everything?');
            if (clearConfirm) {
                displayNumber = '';
                rawData = '';
            }
            break;
        case 'pos-neg':
            switchPositiveNegative();
            break;
        case 'factorial':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false) {
                displayNumber = displayNumber + '!';
                addDisplayToRaw();
                displayNumber = '';
            } else {
                warning.textContent = `You must use a whole number before using a factorial '!'`;
            }
            break;
        case 'exponent':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false) {
                displayNumber = displayNumber + '^';
            } else {
                warning.textContent = `A whole number 'x' must be selected before using the exponent for a whole number 'y'`;
            }
            break;
        case 'backspace':
            backspaceNumberOrOperator()
            break;
        case 'plus':
            if (isDoubleOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' + ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '+'`
                alert('You must have a number before choosing "+" ')
            }
            break;
        case 'minus':
            if (isDoubleOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' - ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '-'`
            }
            break;
        case 'times':
            if (isDoubleOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' * ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '*'`
            }
            break;
        case 'divide':
            if (isDoubleOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' / ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '/'`
            }
            break;
        case 'equals':
            addDisplayToRaw();
            displayNumber = '';
            calculateData();
            break;
        default:
            console.log('default for collectNumbers');
            break;
    }
    display.textContent = displayNumber;
    rawDisplay.textContent = rawData;
}

// Check to see if user clicks two math operators back to back
// Exception: factorial (!) and period (.)
function isDoubleOperator() {
    if (displayNumber.length != 0 || (rawData.charAt(rawData.length - 1).match(/[\d!\.]/))) {
        return false;
    } else {
        return true;
    }
}

// Check to see if a user clicks on a number immediately after choosing factorial (for example: 3!4)
function hasPreviousFactorial() {
    if (rawData.charAt(rawData.length - 1).match(/!/) && displayNumber.length == 0) {
        if (warning.textContent.length == 0) {
            warning.textContent = 'Please use a math operator after using a factorial'
        }
        return true;
    } else {
        return false;
    }
}

// Check to see if a user is trying to divide by 0 (for example: 32 / 0)
function hasDivision() {
    if (rawData.charAt(rawData.length - 1).match(/\//)) {
        return false;
    } else {
        return true;
    }
}

// Check to see if user clicked on period twice in the same number (for example: 3.14.159)
function hasPreviousPeriod() {
    if (displayNumber.match(/\./)) {
        return true;
    } else {
        return false;
    }
}

// Check for an exponent in number, before adding a decimal point.
function hasExponent() {
    if (displayNumber.match(/\^/)) {
        return true;
    } else {
        return false;
    }
}

// Check to see if there is a number preceding for factorial and exponent
function hasPreviousNumber() {
    if (displayNumber.charAt(displayNumber.length - 1).match(/\d/)) {
        return true;
    } else {
        return false;
    }
}

// Backspace 1 space in Display Number, or 1-2 in Raw Data
function backspaceNumberOrOperator() {
    // If there is a display number, delete from it first
    if (displayNumber.length >= 1) {
        let displayArray = displayNumber.split('');
        displayArray.pop();
        let displayString = displayArray.join('');
        displayNumber = displayString;
    } else {
        let rawDataArray = rawData.split('');
        // If the array has an empty string at the end (for example, from ' + ')
        if (rawDataArray.length >= 1 && rawDataArray[rawDataArray.length-1].match(/\s/)) {
            rawDataArray.pop();
            rawDataArray.pop();
        } else {
            rawDataArray.pop();
        }
        let rawDataString = rawDataArray.join('');
        rawData = rawDataString;
    }
}

// Add or remove negative sign from display number
function switchPositiveNegative() {
    // If there is not a display number, it will start with '-'
    if (displayNumber.length == 0) {
        displayNumber = '-';
    } else {
        let displayArray = displayNumber.split('');
        // If the display number is already negative, delete the '-'
        if (displayArray[0].match(/-/)) {
            displayArray.shift();
            let displayString = displayArray.join('');
            displayNumber = displayString;
        } else {
            // If the dislay number is positive, add a "-" to the begining of the array
            displayArray.unshift('-');
            let displayString = displayArray.join('');
            displayNumber = displayString;
        }
    }
}

// Add displayNumber to the end of rawData string
function addDisplayToRaw() {
    rawData = rawData + displayNumber;
}

function calculateData() {
    // Create Sample rawData - DELETE AFTER
    rawData = '1 + 10! - 12^2 * -3 / 0.5 + 4! * 3^2 -3.75 / 2 - 7';
    console.log(`calculateData running ${rawData}`)
    // Find how many math symbols there are to complete
    let operatorMatch = rawData.match(/[^0-9\s\.]/g);
    console.log(operatorMatch.length);
    // Need to define the order of operations.
    for (i = 1; i <= operatorMatch.length; i++) {
        // First order of operation is FACTORIAL
        if (rawData.match(/\d+!/)) {
            let factorialMatch = rawData.match(/\d+!/)[0];
            // Remove the '!' before running factorial function
            let factorialArray = factorialMatch.split('');
            factorialArray.pop();
            factorialNumber = factorialArray.join('');
            let factorialResult = factorial(factorialNumber);
            // Replace the rawData with the factorialResult
            let factoralRawData = /\d+!/[Symbol.replace](rawData, factorialResult);
            rawData = factoralRawData;
            console.log(rawData);
        } else if (rawData.match(/\d+\^\d+/)) {
            console.log('exponent function needs to happen')
            let exponentMatch = rawData.match(/\d+\^\d+/)[0];
            // console.log(exponentMatch);
            // Find the whole and exponent to run exponent function
            let wholeNumber = exponentMatch.match(/^\d+/)[0];
            let exponentNumber = exponentMatch.match(/\d$/)[0];
            // console.log(wholeNumber);
            // console.log(exponentNumber);
            let exponentResult = exponent(wholeNumber, exponentNumber);
            // replace rawData with the exponentResult
            let exponentRawData = /\d+\^\d+/[Symbol.replace](rawData, exponentResult);
            rawData = exponentRawData;
            console.log(rawData);
        } else {
            console.log('continue looking for another symbol')
        }
    }
}
// [^ ]    - Matches Characters NOT in brackets
// let noTimesData = timesRegExp[Symbol.replace](rawData, timesResult)

calcButtons.forEach(calcButton => calcButton.addEventListener('click', collectData))

// ORDER OF OPERATIONS:
// Parenthesis
// Factorial
// Exponentiation
// Multiplication and division - left to right
// Addition and subtraction - left to right

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
    // console.log(noTimesData);
}

// calcData();

// Want to make sure it works with periods!!!

let rawDataTest = '10+3*1.2/6-4'
function calcDataTest() { 
    // NEED TO DO LEFT TO RIGHT, so FIND MULT OR DIV THEN DECIDE
    // Need to do one match symbol at a time
    // console.log(rawDataTest);
    // Step 1: Define the Regex Pattern to Find - and keep for .replace 
    let timesRegExp = /\d+\.?\d?\*\d+\.?\d?/;
    // Step 2: Define what matches the regex
    let timesMatch = rawDataTest.match(timesRegExp);
    // console.log(timesMatch);
    // Step 3: Turn the matched pattern into a string and split it at the match symbol
    let timesString = timesMatch.toString().split('*');
    // console.log(timesString);
    // Step 4: Multiply the two digits on each side of the symbol
    timesResult = multiplyData(timesString);
    // console.log(timesFinal);
    // Step 5: Replace raw data with the result of the multiplication
    // NEED BETTER NAME
    let noTimesData = timesRegExp[Symbol.replace](rawDataTest, timesResult)
    // console.log(noTimesData);
    // Will need to limit the length of the number
}

calcDataTest();

// TO DO: 
// Disable negative exponent?
// Set-Up the Equal button
// Store the Result of the equal button to use again.
// Round large numbers / decimals points
// Add keyboard