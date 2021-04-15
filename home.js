var num = 0
var numstr = ""
setNum()
var count = 0

function compare(guess, num) {
  let arr = [0,0]
  for(let i = 0; i<4; i++) {
    for(let j = 0; j<4; j++) {
      if(guess.charAt(i) == num.charAt(j)) {
        arr[0]++
      }
    }
    if(guess.charAt(i) == num.charAt(i)) {
      arr[1]++
    }
  }
  return arr
}

function update() {
  var guess = document.getElementById("guess").value
  var gstr = guess.toString()
  var correctDigits = compare(gstr, numstr)[0]
  var correctPositions = compare(gstr, numstr)[1]
  if(gstr.length == 4) {
    let text = ""
    text += "<tr>"
    text += "<td>" + guess + "</td>"
    text += "<td>" + correctDigits + "</td>"
    text += "<td>" + correctPositions + "</td>"
    text += "</tr>"
    document.getElementById("guess-table").innerHTML += text
    count++
    document.getElementById("guess").value = ""
    if(correctPositions == 4) {
      alert("You have guessed the number " + numstr + " in " + count + " attempts!")
      reset()
    }
  } else {
    alert("Enter a valid guess!")
    document.getElementById("guess").value = "" 
  }
}

function reset() {
  document.getElementById("guess-table").innerHTML = "<thead><tr><th>Guess</th><th>Correct Digit</th><th>Correct Position</th></tr></thead>"
  document.getElementById("guess").value = ""
  setNum()
}

function setNum() {
  num = Math.floor(Math.random() * 10000)
  while(checkRepeat(num) || num<999) {
    num = Math.floor(Math.random() * 10000)
  }
  numstr = num.toString()
  console.log(num)
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