class Calculator
{
  constructor(InputNumber_, dummyNumber_)
   {
    this.InputNumber_ = InputNumber_
    this.dummyNumber_ = dummyNumber_
    this.clear()
  }

  clear() 
  {
    this.NextContent = ''
    this.Content = ''
    this.operation = undefined
  }

  delete() 
  {
    this.NextContent = this.NextContent.toString().slice(0, -1)
  }

  concatenation(number) 
  {
    if (number === '.' && this.NextContent.includes('.')) return
    this.NextContent = this.NextContent.toString() + number.toString()
  }

  callFunction(operation) 
  {
    if (this.NextContent === '') return
    if (this.Content !== '') {
      this.compute()
    }
    this.operation = operation
    this.Content = this.NextContent
    this.NextContent = ''
  }

  compute() 
  {
    let computation
    const prev = parseFloat(this.Content)
    const current = parseFloat(this.NextContent)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) 
	{
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.NextContent = computation
    this.operation = undefined
    this.Content = ''
  }

  getDisplayNumber(number)
   {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits))
	{
      integerDisplay = ''
    }
	 else 
	{
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) 
	{
      return `${integerDisplay}.${decimalDigits}`
    } 
	else
	 {
      return integerDisplay
    }
  }

  updateDisplay() 
  {
    this.dummyNumber_.innerText =
      this.getDisplayNumber(this.NextContent)
    if (this.operation != null) {
      this.InputNumber_.innerText =
        `${this.getDisplayNumber(this.Content)} ${this.operation}`
    } else {
      this.InputNumber_.innerText = ''
    }
  }
}
const InputNumber_ = document.querySelector('[PrevNum]')
const dummyNumber_ = document.querySelector('[DummyNum]')

const Obj = new Calculator(InputNumber_, dummyNumber_)

document.querySelectorAll('[inputNum]').forEach(button => {
  button.addEventListener('click', () => {
    Obj.concatenation(button.innerText)
    Obj.updateDisplay()
  })
})

document.querySelectorAll('[inputOpr]').forEach(button => {
  button.addEventListener('click', () => {
    Obj.callFunction(button.innerText)
    Obj.updateDisplay()
  })
})

document.querySelector('[inputEq]').addEventListener('click', button => {
  Obj.compute()
  Obj.updateDisplay()
})

document.querySelector('[inputClear]').addEventListener('click', button => {
  Obj.clear()
  Obj.updateDisplay()
})

document.querySelector('[inputDel]').addEventListener('click', button => {
  Obj.delete()
  Obj.updateDisplay()
})