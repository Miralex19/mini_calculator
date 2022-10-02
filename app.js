class Calculator{
    constructor(previous_operandTextElement,current_operandTextElement){
        this.previous_operandTextElement = previous_operandTextElement
        this.current_operandTextElement = current_operandTextElement
        this.clear()
    }

    clear(){
        this.current_operand = ""
        this.previous_operand = ""
        this.operation = undefined

    }
    delete(){
        this.current_operand = this.current_operand.toString().slice(0, -1)

    }
    appendNumber(number){
    if(number === "." && this.current_operand.includes('.'))return
        this.current_operand = this.current_operand.toString() + number.toString()

    }
    chooseOperation(operation){
        if(this.current_operand === '')return
        if(this.previous_operand !== ""){
            this.compute()
        }
        this.operation= operation
        this.previous_operand = this.current_operand
        this.current_operand = ''

    }
    compute(){
        let computation
        const prev = parseFloat(this.previous_operand)
        const current = parseFloat(this.current_operand)

        if (isNaN(prev) || isNaN(current))return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                    computation = prev - current
                    break
            case '*':
                    computation = prev * current
                    break
            case '/':
                computation = prev / current
                    break
            default:
                return  
        }
        this.current_operand = computation
        this.operation = undefined
        this.previous_operand = ""


    }
    getDisplayNumber(number){
      const stringNumber = number.toString()
      const integerDigits = (stringNumber.split('.')[0])
      const decimalDigits = (stringNumber.split('.')[1])
      let integerDisplay
      if (isNaN(integerDigits)){
        integerDisplay = ""
      }else{
        integerDisplay =  integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
      }
      if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
      }
      else{
        return integerDisplay
      }
    }
    updateDisplay(){
        this.current_operandTextElement.innerText = this.getDisplayNumber(this.current_operand)
        if(this.operation != null){
        this.previous_operandTextElement.innerText = 
            `${this.getDisplayNumber(this.previous_operand)} ${this.operation}`
        
        }else{
            this.previous_operandTextElement.innerText = ""
        }

    }


}
const numButtons = document.querySelectorAll("[data-numbers]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all_clear]')
const previous_operandTextElement = document.querySelector('[data-previous_operand]')
const current_operandTextElement = document.querySelector('[data-current_operand]')


const calculator = new Calculator(previous_operandTextElement, current_operandTextElement)

numButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalButton.addEventListener('click', button => {
calculator.compute()
calculator.updateDisplay()
})
clearButton.addEventListener('click', button => {
calculator.clear()
calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
calculator.delete()
calculator.updateDisplay()
})
