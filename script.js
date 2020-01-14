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
