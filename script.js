const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const rawDisplay = document.querySelector('.raw-display');
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
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '0';
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
                alert('To use a decimal point, you can not have another decimal point, factorial, or exponent')
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
                alert('You must a whole number before using a factorial "!"')
            }
            break;
        case 'exponent':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false) {
                displayNumber = displayNumber + '^';
            } else {
                alert('The whole number first number "x" before using the exponent for the number "y"')
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
                alert('You must have a number before choosing "+" ')
            }
            break;
        case 'minus':
            if (isDoubleOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' - ';
                displayNumber = '';
            } else {
                alert('You must have a number before choosing "-" ')
            }
            break;
        case 'times':
            if (isDoubleOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' * ';
                displayNumber = '';
            } else {
                alert('You must have a number before choosing "*" ')
            }
            break;
        case 'divide':
            if (isDoubleOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' / ';
                displayNumber = '';
            } else {
                alert('You must have a number before choosing "/" ')
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
        alert('Please enter a math operator after using the factorial operator');
        return true;
    } else {
        return false;
    }
}

// Check to see if user clicked on period twice in the same number (for example: 3.14.159)
function hasPreviousPeriod() {
    if (displayNumber.match(/\./)) {
        // alert('You can not enter more then 1 decimal point in a number');
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
    // Need to define the order of operations.
    console.log(`calculateData ran ${rawData}`)
}

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
// Set-Up the Equal button
// Store the Result of the equal button to use again.
// Round large numbers / decimals points
// Add keyboard