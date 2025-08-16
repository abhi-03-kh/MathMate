function add(a, b) {
    return a+b;
}
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a*b;
}
function divide(a, b) {
    return a/b;
}


let firstNum = null
let operator = null
let displayValue = '0'

function operate(op, a, b) {
    switch (op) {
        case '+': return add(a,b)
        case '-': return subtract(a,b)
        case '×': return multiply(a,b)
        case '÷': return divide(a,b)
    
        default: return b
    }
}