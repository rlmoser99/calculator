// File worked on 1/18 - Need to re-work how display & rawData are display and can used for second calcuation

const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const rawDisplay = document.querySelector('.raw-display');
const warning = document.querySelector('.warning')
let displayNumber = '';
let rawData = '';
let rawDataFinalDisplay = '';
let calculatedAnswer = '';
// let result = '';


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
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

function collectData(e) {   
    // hasPreviousCalculation(e); 
    // console.log(this.id);
    warning.textContent = '';   
    switch(this.id) {
        case 'zero':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false && hasDivision() === false) {
                displayNumber = displayNumber + '0';
            } else {
                warning.textContent = `You can not enter '0' directly after a division or factorial sign`;
            }
            break;
        case 'nine':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '9';
            }
            break;
        case 'eight':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '8';
            }
            break;
        case 'seven':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '7';
            }
            break;
        case 'six':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '6';
            }
            break;
        case 'five':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '5';
            }
            break;
        case 'four':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '4';
            }
            break;
        case 'three':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '3';
            }
            break;
        case 'two':
            // hasPreviousCalculation(e);
            if (hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '2';
            }
            break;
        case 'one':
            // hasPreviousCalculation(e);
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
            takeRawForFinalResults()
            // displayNumber = '';
            calculateData();
            // displayNumber = rawData;
            break;
        default:
            console.log('default for collectNumbers');
            break;
    }
    displayWhichNumber();
    // display.textContent = displayNumber;
    displayRawData(event);
    console.log(`displayNumber ${displayNumber} calculatedAnswer ${calculatedAnswer}`);
    console.log(`rawData ${rawData} rawDataFinalDisplay ${rawDataFinalDisplay}`)
}

function displayWhichNumber() {
    if (calculatedAnswer.length == 0) {
        // console.log('displayWhichNumber will display number')
        display.textContent = displayNumber;
    } else {
        display.textContent = calculatedAnswer;
        // console.log('displayWhichNumber will display calculatedAnswer')
    }
}
// calculatedAnswer = '' when user re-starts.

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
    if (calculatedAnswer.length == 0) {
        console.log('There is not calculated answer')
        rawData = rawData + displayNumber;
    } else {
        rawData = calculatedAnswer;
        console.log('there is a calculated answer')
    }
}

// rawData = '1 + 10! - 12^2 * 3 / 0.5 + -4! * 3^2 + -3.75 / 2 - 7';
function calculateData() {
    // console.log(rawData)
    if (rawData.match(/\d+!/)) {
        solveFactorial();
    } else if (rawData.match(/\d+\^\d+/)) {
        solveExponent();
    } else if (rawData.match(/\*|\//)) {
        solveMultiplicationOrDivison();
    } else if ((rawData.match(/[\s][\+|-][\s]/))) {
        solveAdditionOrSubtraction();
    } else {
        // return rawData;
        displayNumber = rawData;
        calculatedAnswer = rawData;
    }
}

function solveFactorial() {
    let factorialMatch = rawData.match(/\d+!/)[0];
    // Remove the '!' before running factorial function
    let factorialArray = factorialMatch.split('');
    factorialArray.pop();
    factorialNumber = factorialArray.join('');
    let factorialResult = factorial(factorialNumber);
    // Replace the rawData with the factorialResult
    let factoralRawData = /\d+!/[Symbol.replace](rawData, factorialResult);
    rawData = factoralRawData;
    // console.log(rawData);
    calculateData();
}

function solveExponent() {
    let exponentRegExp = /\d+\^\d+/;
    let exponentMatch = rawData.match(exponentRegExp)[0];
    // Find the whole and exponent to run exponent function
    let wholeNumber = exponentMatch.match(/^\d+/)[0];
    let exponentNumber = exponentMatch.match(/\d+$/)[0];
    let exponentResult = exponent(wholeNumber, exponentNumber);
    // replace rawData with the exponentResult
    let exponentRawData = exponentRegExp[Symbol.replace](rawData, exponentResult);
    rawData = exponentRawData;
    calculateData();
}

function solveMultiplicationOrDivison() {
    let multiplicationDivisionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\*|\/][\s](\-?)[\d]+(\.?)[\d]*/;
    let multiplicationDivisionMatch = rawData.match(multiplicationDivisionRegExp)[0];
    let isMultiplicationOrDivision = multiplicationDivisionMatch.match(/\*|\//)[0];
    // Find the two numbers to run multiplication or division function
    let numberRegExp = /(\-?)[\d]+(\.?)[\d]*/g;
    let firstNumber = multiplicationDivisionMatch.match(numberRegExp)[0];
    let secondNumber = multiplicationDivisionMatch.match(numberRegExp)[1];
    if (isMultiplicationOrDivision == '*') {
        let multiplicationResult = multiply(firstNumber, secondNumber);
        // Replace rawData with multiplicationResult
        let multiplicationRawData = multiplicationDivisionRegExp[Symbol.replace](rawData, multiplicationResult);
        rawData = multiplicationRawData;
    } else {
        let divisionResult = divide(firstNumber, secondNumber);
        // Replace rawData with divisionResult
        let divisionRawData = multiplicationDivisionRegExp[Symbol.replace](rawData, divisionResult);
        rawData = divisionRawData;
    }
    calculateData();
}

function solveAdditionOrSubtraction() {
    // Need to go from left to right finding all of the + or - symbols
    const additionSubtractionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\+|-][\s](\-?)[\d]+(\.?)[\d]*/;
    let additionSubtractionMatch = rawData.match(additionSubtractionRegExp)[0];
    let isAdditionOrSubtraction = additionSubtractionMatch.match(/[\s][\+|-][\s]/)[0];
    let numberRegExp = /(\-?)[\d]+(\.?)[\d]*/g;
    let firstNumber = Number(additionSubtractionMatch.match(numberRegExp)[0]);
    let secondNumber = Number(additionSubtractionMatch.match(numberRegExp)[1]);
    if (isAdditionOrSubtraction == ' + ') {
        let additionResult = add(firstNumber, secondNumber);
        let additionRawData = additionSubtractionRegExp[Symbol.replace](rawData, additionResult);
        rawData = additionRawData;
    } else {
        let subtractionResult = subtract(firstNumber, secondNumber);
        let subtractionsRawData = additionSubtractionRegExp[Symbol.replace](rawData, subtractionResult);
        rawData = subtractionsRawData;
    }
    calculateData()
}

function takeRawForFinalResults() {
    let rawDataFinalArray = rawData.split(' ');
    rawDataFinalDisplay = rawDataFinalArray.join(' ');
}

function displayRawData() {
    // console.log(event.target.className);
    if (rawDataFinalDisplay.length == 0) {
        rawDisplay.textContent = rawData;
    } else {
        rawDisplay.textContent = rawDataFinalDisplay;
    }
}
// Need to change rawDataFinalDisplay = '0' when user re-starts

// Create a function "shouldButtonClearDisplay"
// True: When Math operator button is pushed - move display to raw
// True: After Equal Button has been pushed & answer is in display & NUMBER has been pushed
// False: After Equal Button has been pushed & answer is in display & Operator has been pushed
// False: When pushing a button in the normal flow - add to display

// When a number has been pushed after the calculateData (equal sign) has ran. Clears calc.
// function hasPreviousCalculation(e) {
//     console.log(e.target.dataset.display)
//     if (e.target.dataset.display = "clear") {
//         console.log("hasPreviousCalculation has clear data-set")
//         // displayNumber = '';
//         // rawDataFinalDisplay = '';
//         // calculatedAnswer = '';
//         // rawData = '';
//     } else if (e.target.dataset.display = "keep") {
//         // displayNumber = '';
//         // rawDataFinalDisplay = '';
//         // calculatedAnswer = '';
//         // rawData = '';
//         console.log('hasPreviousCalculatation has keep data-set')
//     } else {
//         console.log('hasPreviousCalculations with no data-set')
//     }
// }

// function hasPreviousCalculation() {
//     if (rawDataFinalDisplay.length != 0) {
//         displayNumber = '';
//         rawDataFinalDisplay = '';
//         calculatedAnswer = '';
//         rawData = '';
//     }
// }

calcButtons.forEach(calcButton => calcButton.addEventListener('click', collectData))

// TO DO: 
// 5*4 = 20 -2 = 2018 (2020-2)
// 9^8 + 50 - got an error message on the 0
// Store the Result of the equal button to use again.
// Check out decimal points to be found in all kinds of numbers (discoverd during mult/div)
// Disable negative exponent?
// Round large numbers / decimals points
// Add keyboard
// Look at creating function to add button text content to displayNumber, rather then hard-code it.