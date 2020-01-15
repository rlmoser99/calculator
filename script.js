const numberButtons = document.querySelectorAll('.number');
const display = document.querySelector('.display');
let displayNumber = '';   

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
    if (b === 0) {
        alert("Can not divide by 0");
    } else {
        return a / b;
    }
}

function operate(a, b, operator) {
    switch (operator) {
        case add:
            return add(a, b);
            break;
        case subtract:
            return subtract(a, b);
            break;
        case multiply:
            return multiply(a, b);
            break;
        case divide:
            return divide(a, b);
            break;
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
    console.log(displayNumber);        
}

numberButtons.forEach(numberButton => numberButton.addEventListener('click', collectNumbers))


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
