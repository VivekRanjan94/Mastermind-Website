const numberButtons = document.querySelectorAll('[data-number]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const display = document.querySelector('#display')
const submit = document.querySelector('#submit')
const resetbtn = document.querySelector('#reset')
const table = document.querySelector('#guess-table')

const numOfDigits = 4
const numOfAttempts = 10
var num = setNum()
var guess = 0
var count = 0

function updateDisplay(number) {
  if(display.innerText.toString().length < numOfDigits) {
    display.innerText += number
  } else {
    alert("Too many digits!!")
  }
}

function backspace() {
  let text = display.innerText.toString()
  display.innerText = text.substring(0, text.length-1)
}

function clearDisplay() {
  display.innerText = ""
}

function reset() {
  table.innerHTML = "<thead><tr><th>Guess</th><th>Correct Digit</th><th>Correct Position</th></tr></thead>"
  clearDisplay()
  num = setNum()
}

function compare(guess, num) {
  let gstr = guess.toString()
  let numstr = num.toString()
  let arr = [0,0]
  for(let i = 0; i<numOfDigits; i++) {
    for(let j = 0; j<numOfDigits; j++) {
      if(gstr.charAt(i) == numstr.charAt(j)) {
        arr[0]++
      }
    }
    if(guess.charAt(i) == numstr.charAt(i)) {
      arr[1]++
    }
  }
  return arr
}

function main() {
  var correctDigits = compare(guess, num)[0]
  var correctPositions = compare(guess, num)[1]
  if(guess.toString().length == numOfDigits) {
    let text = ""
    text += "<tr>"
    text += "<td>" + guess + "</td>"
    text += "<td>" + correctDigits + "</td>"
    text += "<td>" + correctPositions + "</td>"
    text += "</tr>"
    table.innerHTML += text

    count++
    clearDisplay()

    if(correctPositions == numOfDigits) {
      alert("You have guessed the number " + num + " in " + count + " attempts!")
      reset()
    }
  } else {
    alert("Enter a valid guess!")
    clearDisplay() 
  }
}

function setNum() {
  var num = Math.floor(Math.random() * 10000)
  while(checkRepeat(num) || num<999) {
    num = Math.floor(Math.random() * 10000)
  }
  numstr = num.toString()
  console.log(num)
  return num
}

function checkRepeat(number) {
  num = number.toString()
  for(let i = 0; i<4; i++) {
    for(let j = 0; j<4; j++) {
      if(i!=j && (num.charAt(i) == num.charAt(j))) {
        return true
      }
    }
  }
  return false
}


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(button.innerText)
  })
})

allClearButton.addEventListener('click', button => {
  clearDisplay()
})

deleteButton.addEventListener('click', button => {
  backspace()
})

submit.addEventListener('click', () => {
  guess = display.innerText
  main()
})

resetbtn.addEventListener('click' , () => {
  reset()
})