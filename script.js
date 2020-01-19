const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const rawDisplay = document.querySelector('.raw-display');
const warning = document.querySelector('.warning')
let displayNumber = '';
let rawData = '';
let rawDataResult = '';

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
    warning.textContent = '';   
    // console.log(this.id);
    switch(this.id) {
        case 'zero':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false && (hasDivision() === false) || hasPreviousNumber() === true) {
                displayNumber = displayNumber + '0';
            } else {
                warning.textContent = `You can not enter '0' directly after a division or factorial sign`;
            }
            break;
        case 'nine':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '9';
            }
            break;
        case 'eight':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '8';
            }
            break;
        case 'seven':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '7';
            }
            break;
        case 'six':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '6';
            }
            break;
        case 'five':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '5';
            }
            break;
        case 'four':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '4';
            }
            break;
        case 'three':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '3';
            }
            break;
        case 'two':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '2';
            }
            break;
        case 'one':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '1';
            }
            break;
        case 'period':
            resetDisplayNumber();
            if (displayNumber.length == 0 && hasPreviousFactorial() === false && exceedsDisplay() === false) {
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
            if (exceedsDisplay() === false) {
                switchPositiveNegative();
            }
            break;
        case 'factorial':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '!';
                addDisplayToRaw();
                displayNumber = '';
            } else {
                warning.textContent = `You must use a whole number before using a factorial '!'`;
            }
            break;
        case 'exponent':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false && exceedsDisplay() === false) {
                clearRawDataResult();
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
            if (validEquation() === true) {
                copyRawDataToCalculate();
                displayNumber = rawDataResult;
            } else {
                warning.textContent = `You must have a valid equation to solve. It can not end with '+ - * /'`
            }
            break;
        default:
            console.log('default for collectNumbers');
            break;
    }
    // formatDisplayNumber();
    display.textContent = displayNumber;
    displayRawData();
}

function resetDisplayNumber() {
    if (rawDataResult != 0) {
        displayNumber = '';
        rawDataResult = '';
    }
}

// function formatDisplayNumber() {
//     if (displayNumber.length > 12) {
//         display.style.fontSize = "2rem"
//     }
// }

function exceedsDisplay() {
    if (displayNumber.length >= 12) {
        warning.textContent = `You can not enter more then 12 digits`
        return true;
    } else {
        return false;
    }
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

// Checks to see if user inputs number after factorial (for example: 3!4)
function hasPreviousFactorial() {
    if (rawData.charAt(rawData.length - 1).match(/!/)) {
        return true;
    } else {
        return false;
    }
}

// Check to see if a user is trying to divide by 0 (for example: 32 / 0)
function hasDivision() {
    if (rawData.charAt(rawData.length - 2).match(/\//) || displayNumber.charAt(displayNumber.length - 1).match(/\d/)) {
        return true;
    } else {
        return false;
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
    if (rawDataResult.length == 0) {
        rawData = rawData + displayNumber;
    } else {
        rawData = displayNumber;
        rawDataResult = '';
    }
}

// Must clear rawDataResult, to use exponents on the product on previous equation
function clearRawDataResult() {
    if (rawDataResult.length != 0) {
        rawDataResult = '';
    }
}

// Must valiate equation, so it does not end with +_*? - The last thing should be a digit or factorial
function validEquation() {
    if (rawData.charAt(rawData.length - 1).match(/!|\d/)) {
        return true;
    } else {
        return false;
    }
}

// Make a copy of rawData to be able to display after calculateData
function copyRawDataToCalculate() {
    let rawDataArray = rawData.split(' ');
    rawDataResult = rawDataArray.join(' ');
    calculateData();
}

function calculateData() {   
    if (rawDataResult.match(/\d+!/)) {
        solveFactorial();
    } else if (rawDataResult.match(/\d+\^\d+/)) {
        solveExponent();
    } else if (rawDataResult.match(/\*|\//)) {
        solveMultiplicationOrDivison();
    } else if ((rawDataResult.match(/[\s][\+|-][\s]/))) {
        solveAdditionOrSubtraction();
    } else {
        if (rawDataResult.length > 12) {
            // console.log('Need to format rawDataResults')
            formatRawDataResults();
            return rawDataResult;
        } else {
            return rawDataResult;
        }
    }
}

function solveFactorial() {
    let factorialMatch = rawDataResult.match(/\d+!/)[0];
    // Remove the '!' before running factorial function
    let factorialArray = factorialMatch.split('');
    factorialArray.pop();
    factorialNumber = factorialArray.join('');
    let factorialResult = factorial(factorialNumber);
    // Replace the rawDataResult with the factorialResult
    let factoralRawData = /\d+!/[Symbol.replace](rawDataResult, factorialResult);
    rawDataResult = factoralRawData;
    calculateData();
}

function solveExponent() {
    let exponentRegExp = /\d+\^\d+/;
    let exponentMatch = rawDataResult.match(exponentRegExp)[0];
    // Find the whole and exponent to run exponent function
    let wholeNumber = exponentMatch.match(/^\d+/)[0];
    let exponentNumber = exponentMatch.match(/\d+$/)[0];
    let exponentResult = exponent(wholeNumber, exponentNumber);
    // replace rawDataResult with the exponentResult
    let exponentRawData = exponentRegExp[Symbol.replace](rawDataResult, exponentResult);
    rawDataResult = exponentRawData;
    calculateData();
}

function solveMultiplicationOrDivison() {
    let multiplicationDivisionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\*|\/][\s](\-?)[\d]+(\.?)[\d]*/;
    let multiplicationDivisionMatch = rawDataResult.match(multiplicationDivisionRegExp)[0];
    let isMultiplicationOrDivision = multiplicationDivisionMatch.match(/\*|\//)[0];
    // Find the two numbers to run multiplication or division function
    let numberRegExp = /(\-?)[\d]+(\.?)[\d]*/g;
    let firstNumber = multiplicationDivisionMatch.match(numberRegExp)[0];
    let secondNumber = multiplicationDivisionMatch.match(numberRegExp)[1];
    if (isMultiplicationOrDivision == '*') {
        let multiplicationResult = multiply(firstNumber, secondNumber);
        // Replace rawDataResult with multiplicationResult
        let multiplicationRawData = multiplicationDivisionRegExp[Symbol.replace](rawDataResult, multiplicationResult);
        rawDataResult = multiplicationRawData;
    } else {
        let divisionResult = divide(firstNumber, secondNumber);
        // Replace rawDataResult with divisionResult
        let divisionRawData = multiplicationDivisionRegExp[Symbol.replace](rawDataResult, divisionResult);
        rawDataResult = divisionRawData;
    }
    calculateData();
}

function solveAdditionOrSubtraction() {
    // Need to go from left to right finding all of the + or - symbols
    const additionSubtractionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\+|-][\s](\-?)[\d]+(\.?)[\d]*/;
    let additionSubtractionMatch = rawDataResult.match(additionSubtractionRegExp)[0];
    let isAdditionOrSubtraction = additionSubtractionMatch.match(/[\s][\+|-][\s]/)[0];
    let numberRegExp = /(\-?)[\d]+(\.?)[\d]*/g;
    let firstNumber = Number(additionSubtractionMatch.match(numberRegExp)[0]);
    let secondNumber = Number(additionSubtractionMatch.match(numberRegExp)[1]);
    if (isAdditionOrSubtraction == ' + ') {
        let additionResult = add(firstNumber, secondNumber);
        let additionRawData = additionSubtractionRegExp[Symbol.replace](rawDataResult, additionResult);
        rawDataResult = additionRawData;
    } else {
        let subtractionResult = subtract(firstNumber, secondNumber);
        let subtractionsRawData = additionSubtractionRegExp[Symbol.replace](rawDataResult, subtractionResult);
        rawDataResult = subtractionsRawData;
    }
    calculateData()
}

// Re-sets the rawData after the equal sign has been used
function displayRawData() {
    if (rawDataResult.length == 0) {
        rawDisplay.textContent = rawData;
    } else {
        rawDisplay.textContent = rawData;
        rawData = '';
    }
}

function formatRawDataResults() {
    let formattedRawDataArray = rawDataResult.split('');
    formattedRawDataArray.pop();
    console.log(formattedRawDataArray);
    let formattedRawData = formattedRawDataArray.join('');
    rawDataResult = formattedRawData;
    warning.textContent = `The result has been formatted to fit in the display area`;
    calculateData();
}

calcButtons.forEach(calcButton => calcButton.addEventListener('click', collectData))

// TO DO: 
// Round large numbers / decimals points ~12 charaacter for display
// Look for "e+" in result to be able to reduce it differently
// 
// Add keyboard
// Lots of 777777777777! - did not work. Not sure why. - I think it locked down the computer! Limit size of factorial.
// Make backspace icon the teal color?