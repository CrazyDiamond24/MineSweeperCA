'use strict'
// Utility Functions
//～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～//

//----------------------------------------
function renderBoard() {
  var strHTML = `<table><tbody>`
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += `<tr>`
    for (var j = 0; j < gBoard[i].length; j++) {
      var className = `cell cell${i}-${j}`
      strHTML += `<td class="${className}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(event, this, ${i}, ${j})">${''}</td>`
    }
    strHTML += `</tr>`
  }
  strHTML += `</tbody></table>`
  var elContainer = document.querySelector('.container')
  elContainer.innerHTML = strHTML
}

//----------------------------------------
function renderEmoji(emote) {
  var elSmiley = document.querySelector('.restart')
  elSmiley.innerText = emote
}

//----------------------------------------
function renderCell(pos, value) {
  var elCell = document.querySelector(`.cell${pos.i}-${pos.j}`)
  elCell.innerHTML = value
  if (gBoard[pos.i][pos.j].isMine) {
    elCell.classList.add('danger')
  }
}

// Returns a random integer between min (inclusive) and max (inclusive)
//----------------------------------------
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Returns a random integer between min (inclusive) and max (exclusive)
//----------------------------------------
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

// Returns a random color in hex format
//----------------------------------------
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Returns the current date in a specific format
//----------------------------------------
function getFormattedDate(date = new Date()) {
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  return `${year}-${month}-${day}`
}

//Timer
//----------------------------------------
function startTimer(startTime) {
  var elTimer = document.querySelector('.timer')
  gTimerInterval = setInterval(() => {
    var totalSecs = Math.floor((Date.now() - startTime) / 1000)
    var hour = Math.floor(totalSecs / 3600)
    var minute = Math.floor((totalSecs - hour * 3600) / 60)
    var seconds = totalSecs - (hour * 3600 + minute * 60)
    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute
    if (seconds < 10) seconds = '0' + seconds
    elTimer.innerHTML = `${hour}:${minute}:${seconds}`
  }, 1000)
}
