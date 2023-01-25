'use strict'
// Utility Functions
//～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～//

//render board and render cell goes here

//----------------------------------------
function renderBoard() {
  //render board only once oninit
  //TODO add things to the table tag
  var strHTML = `<table><tbody>`
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += `<tr>`
    for (var j = 0; j < gBoard[i].length; j++) {
      var currCell = gBoard[i][j]
      var className = `cell cell-${i}-${j} covered`
      var cellVal = currCell.isMine ? MINE : currCell.minesAround
      //each cell has class cell + location + state, and onclick events
      strHTML += `<td class="${className}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;">${cellVal}</td>`
    }
    strHTML += `<tr>`
  }
  strHTML += `</tbody></table>`
  var elContainer = document.querySelector('.container')
  elContainer.innerHTML = strHTML
}
//Use Later 
//----------------------------------------
function getNegs(rowIdx, colIdx) {
  var negsLocation = []
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue
    for (var j= colIdx -1; j<=colIdx +1; j++) {
        if (j < 0 || j> gBoard[0].length -1) continue
        if (i === rowIdx && j === colIdx) continue
        if (!gBoard[i][j].isShown) {
            negsLocation.push({i,j})
        }
    }
  }
  return negs
}

//----------------------------------------
function renderCell() {
  //use this for all changes later
  //probably not
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
let gtimerId

function startTimer() {
  let start = Date.now()
  gtimerId = setInterval(() => {
    let elapsed = Math.floor((Date.now() - start) / 1000)
    console.log(`Elapsed time: ${elapsed} seconds`)
  }, 1000)
}
//----------------------------------------
function stopTimer() {
  clearInterval(gtimerId)
}
