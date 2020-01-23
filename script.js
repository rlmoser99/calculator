const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const rawDisplay = document.querySelector('.raw-display');
const warning = document.querySelector('.warning')
const footerIcon = document.querySelector('footer img');
let displayNumber = '';
let rawData = '';
let rawDataResult = '';
let removeDigits = '';
let oldNotation = '';
let formattedRawDataArray = [];

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
    let data = '';
    if (e.key === undefined) {
        data = this.id;
    } else {
        data = e.key;
    }
    switch(data) {
        case '0':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false && hasDivision() === false) {
                displayNumber = displayNumber + '0';
            }
            break;
        case '9':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '9';
            }
            break;
        case '8':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '8';
            }
            break;
        case '7':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '7';
            }
            break;
        case '6':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '6';
            }
            break;
        case '5':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '5';
            }
            break;
        case '4':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '4';
            }
            break;
        case '3':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '3';
            }
            break;
        case '2':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '2';
            }
            break;
        case '1':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '1';
            }
            break;
        case '.':
        case 'period':
            resetDisplayNumber();
            if (displayNumber.length == 0 && hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '0.';
            } else if (hasPreviousFactorial() === false && hasPreviousPeriod() === false && hasExponent() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '.';
            }
            break;
        case 'Escape':
        case 'Delete':
        case 'clear':
            let clearConfirm = confirm('Are you sure you want to clear everything?');
            if (clearConfirm) {
                displayNumber = '';
                rawData = '';
            }
            break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'positive-negative':
            if (exceedsDisplay() === false) {
                switchPositiveNegative();
            }
            break;
        case '!':
        case 'factorial':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false && exceedsDisplay() === false && hasTwoDigitsMax() === true) {
                displayNumber = displayNumber + '!';
                addDisplayToRaw();
                displayNumber = '';
            }
            break;
        case '^':
        case 'exponent':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false && exceedsDisplay() === false) {
                clearRawDataResult();
                displayNumber = displayNumber + '^';
            }
            break;
        case 'Backspace':
            resetDisplayNumber();
            backspaceNumberOrOperator()
            break;
        case '+':
        case 'plus':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' + ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '+'`
            }
            break;
        case '-':
        case 'minus':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' - ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '-'`
            }
            break;
        case '*':
        case 'times':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' * ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '*'`
            }
            break;
        case '/':
        case 'divide':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' / ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '/'`
            }
            break;
        case '=':
        case 'Enter':
        case 'equals':
            addDisplayToRaw();
            if (validEquation() === true) {
                copyRawDataToCalculate();
                displayNumber = rawDataResult;
            } else {
                warning.textContent = `You must have a valid equation to solve. It can not end with '+ - * /'`
            }
            break;
        case 'Shift':
            // This is will allow shift to be used for '+ * ^ !' without triggering the default warning for keyboard shortcuts.
            break;
        default:
            warning.innerHTML = `
            <p>Unusual Keyboard Shortcuts:</p>
            <div class="shortcut"<p><img src="img/backspace-solid-white.svg" height=15px /> delete (mac) | backspace (pc)</p></div>
            <p><span>AC</span> escape (mac) | delete (pc)</p>
            <p><span>+/-</span> arrow up or down</p>
            `;
            break;
    }
    display.textContent = displayNumber;
    displayRawData();
}

function resetDisplayNumber() {
    if (rawDataResult != 0) {
        displayNumber = '';
        rawDataResult = '';
    }
}

// BOOLEAN CHECKS:

// Limits the number of digits that can be entered at one time
function exceedsDisplay() {
    if (displayNumber.length >= 12 || rawData.length >= 45) {
        warning.textContent = `The numbers have reached the limit of the display.`
        return true;
    } else {
        return false;
    }
}

// Check to see if user clicks two math operators back to back - exception: factorial (!) and period (.)
function hasPreviousOperator() {
    if (displayNumber.length != 0 || (rawData.charAt(rawData.length - 1).match(/[\d!\.]/))) {
        return false;
    } else {
        return true;
    }
}

// Checks to see if user inputs number after factorial (for example: 3!4)
function hasPreviousFactorial() {
    if (rawData.charAt(rawData.length - 1).match(/!/)) {
        warning.textContent = `Please enter a math operator after using a factorial.`;
        return true;
    } else {
        return false;
    }
}

// Factorials can increase too quickly, so I limited it to 2 digits
function hasTwoDigitsMax() {
    if (displayNumber.length <= 2) {
        return true;
    } else {
        warning.textContent = `The max for a factorial is 2 digits on this calculator.`;
        return false;
    }
}

// Check to see if a user is trying to divide by 0, but still let user divide by 10 (for example: 32 / 0)
function hasDivision() {
    if (rawData.charAt(rawData.length - 2).match(/\//) && displayNumber.length == 0) {
        warning.textContent = `This calculator will not divide by 0. I'm sure in your infinite wisdom you already know the answer to ${rawData} 0.`;
        return true;
    } else {
        return false;
    }
}

// Check to see if user clicked on period twice in the same number (for example: 3.14.159)
function hasPreviousPeriod() {
    if (displayNumber.match(/\./)) {
        warning.textContent = `You can not have a decimal point in a exponent, factorial, or if there is already a decimal point.`;
        return true;
    } else {
        return false;
    }
}

// Check for an exponent in number, before adding a decimal point.
function hasExponent() {
    if (displayNumber.match(/\^/)) {
        warning.textContent = `You can not use a decimal point in an exponent on this calculator`;
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
        warning.textContent = `You must enter a number before using a factorial or exponent`;
        return false;
    }
}

// CALCULATOR FUNCTIONALITY

// Backspace 1 space in Display Number, or 1-3 spaces in Raw Data
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

// Main function that processes the rawData to rawDataResult
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
            // This formatting is not scientific
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

// This is not a REAL scientific notation calculation - This is simply gives an illusion that it is to keep calculator within 12 digit limit
function formatRawDataResults() {
    removeDigits = (rawDataResult.length - 10);
    formattedRawDataArray = rawDataResult.split('');
    let notationRegExp = /e\+*\d+/;
    let decimalRegExp = /\./;
    // Find if there is scientific notation & if so, get length & remove 'n'
    if (rawDataResult.match(notationRegExp)) {
        rawDataMatch = rawDataResult.match(notationRegExp)[0];
        oldNotation = rawDataMatch.length - 1;
        rawDataResult = /e\+*/[Symbol.replace](rawDataResult, 0);
        addNotation(oldNotation);
    // If the number is less then 1 million & has a decimal point, only remove digits.
    } else if (rawDataResult < 1000000000 && rawDataResult.match(decimalRegExp)) {
        for (i = 1; i <= removeDigits - 2; i++) {
            formattedRawDataArray.pop();
        }
        let formattedRawData = formattedRawDataArray.join('');
        rawDataResult = formattedRawData;
    
    } else  {
        addNotation(0);
    }
    warning.textContent = `The result has been formatted to fit in the display area`;
}

// Need to either remove enough places for single or double digits in scientific notation 
function addNotation(oldNotation) {
    if ((removeDigits + oldNotation) >= 10) {
        for (i = 0; i <= removeDigits; i++) {
            formattedRawDataArray.pop();
        }
    } else {
        for (i = 1; i <= removeDigits; i++) {
            formattedRawDataArray.pop();
        }
    }
    let formattedRawData = formattedRawDataArray.join('') + `e${removeDigits + oldNotation}`;
    rawDataResult = formattedRawData;
}

// Footer Hover

function grayIcon() {
    footerIcon.src = "img/github-gray.svg";
}

function whiteIcon() {
    footerIcon.src = "img/github-white.svg";
}

calcButtons.forEach(calcButton => calcButton.addEventListener('click', collectData))
window.addEventListener('keydown', collectData);
footerIcon.addEventListener('mouseenter', grayIcon);
footerIcon.addEventListener('mouseleave', whiteIcon);
