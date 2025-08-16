 // Step 1: Basic math functions
    function add(a, b) { return a + b }
    function subtract(a, b) { return a - b }
    function multiply(a, b) { return a * b }
    function divide(a, b) { return b === 0 ? "Error" : a / b }

    // Step 2: Operate function
    function operate(op, a, b) {
      if (op === '+') return add(a, b)
      if (op === '-') return subtract(a, b)
      if (op === '×') return multiply(a, b)
      if (op === '÷') return divide(a, b)
      return b
    }

    // Step 3: Variables
    let firstNumber = null
    let secondNumber = null
    let currentOp = null
    let displayValue = '0'

    const display = document.getElementById('display')
    const decimalBtn = document.getElementById('decimal')

    // Step 4: Update display
    function updateDisplay() {
      display.textContent = displayValue
      // Disable decimal if one already exists
      decimalBtn.disabled = displayValue.includes('.')
    }

    // Step 5: Button handling
    function handleInput(value, type) {
      // Numbers
      if (type === "number") {
        displayValue = (displayValue === '0') ? value : displayValue + value
        updateDisplay()
      }
      // Decimal
      if (type === "decimal") {
        if (!displayValue.includes('.')) {
          displayValue += '.'
          updateDisplay()
        }
      }
      // Operator
      if (type === "operator") {
        firstNumber = parseFloat(displayValue)
        currentOp = value
        displayValue = '0'
        updateDisplay()
      }
      // Equals
      if (type === "equals") {
        secondNumber = parseFloat(displayValue)
        let result = operate(currentOp, firstNumber, secondNumber)
        displayValue = result.toString()
        updateDisplay()
      }
      // Clear
      if (type === "clear") {
        firstNumber = null
        secondNumber = null
        currentOp = null
        displayValue = '0'
        updateDisplay()
      }
      // Backspace
      if (type === "backspace") {
        displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0'
        updateDisplay()
      }
    }

    // Step 6: Button clicks
    document.querySelectorAll('button').forEach(btn => {
      btn.onclick = () => {
        if (!isNaN(btn.textContent)) handleInput(btn.textContent, "number")
        else if (btn.id === "decimal") handleInput('.', "decimal")
        else if (btn.dataset.op) handleInput(btn.dataset.op, "operator")
        else if (btn.id === "equals") handleInput('=', "equals")
        else if (btn.id === "clear") handleInput('C', "clear")
        else if (btn.id === "backspace") handleInput('⌫', "backspace")
      }
    })

    // Step 7: Keyboard support
    document.addEventListener('keydown', e => {
      if (e.key >= '0' && e.key <= '9') handleInput(e.key, "number")
      if (e.key === '.') handleInput('.', "decimal")
      if (['+', '-', '*', '/'].includes(e.key)) {
        const opMap = { '*':'×', '/':'÷', '+':'+', '-':'-' }
        handleInput(opMap[e.key], "operator")
      }
      if (e.key === '=' || e.key === 'Enter') handleInput('=', "equals")
      if (e.key.toLowerCase() === 'c') handleInput('C', "clear")
      if (e.key === 'Backspace') handleInput('⌫', "backspace")
    })

    updateDisplay()