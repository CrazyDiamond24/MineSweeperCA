'use strict'
//Game basics
//Functionality in Main file
//----------------------------------------
const HAPPY = '😊'
const DEAD = '🥴'
const WINNER = '😎'
const SCARED = '😨'
const TERRIFIED = '😱'
//----------------------------------------
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}

var gBoard
var isTimerOn
var gMinesPos = []

//----------------------------------------
function onInit() {
  gGame.isOn = true
  gBoard = buildBoard(gLevel.SIZE, gLevel.MINES)
  gFlaggedMines = 0
  renderBoard()
  gGame.markedCount = 0
  gGame.shownCount = 0
  gIsFirstClick = true
  gLives = 3
  gMinesPos = []
  isTimerOn = false
  renderEmoji(HAPPY)
}

//----------------------------------------
function setMode(elMode) {
  switch (elMode.dataset.difficulty) {
    case 'Beginner':
      gLevel.SIZE = 4
      gLevel.MINES = 2
      break
    case 'Intermediate':
      gLevel.SIZE = 8
      gLevel.MINES = 12
      break
    case 'Expert':
      gLevel.SIZE = 12
      gLevel.MINES = 30
      break
  }
  resetGame()
}

//if user clicks a mine - render smiley, reveal all mines
//----------------------------------------
function gameOver() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true
        renderCell({ i, j }, MINE)
      }
    }
  }
  for (var i = 0; i < gMinesPos.length; i++) {
    var currMine = gMinesPos[i]
    gBoard[currMine.i][currMine.j].isShown = true
    renderCell(currMine, MINE)
  }
  renderEmoji(DEAD)
  gGame.isOn = !gGame.isOn
  var elImg = document.querySelector('.end')
  elImg.style.display = 'block'
  elImg.src = 'imgs/loss.png'

  var timer = document.querySelector('.timer')
  var timerText = timer.innerText
  clearInterval(gTimerInterval)
  timer.innerText = timerText
}
//----------------------------------------
function resetGame() {
  var timer = document.querySelector('.timer')
  timer.innerText = '00:00:00'
  gIsFirstClick = true
  clearInterval(gTimerInterval)
  if (gTimerInterval) gTimerInterval = null
  isTimerOn = !isTimerOn
  gMinesPos = []
  gGame.isOn = false
  var elLives = document.querySelector('.lives')
  elLives.innerText = '🧡🧡🧡'
  var elImg = document.querySelector('.end')
  elImg.style.display = 'none'
  onInit()
}

//check victory - if all mines are flagged + all clear cells are shown
//----------------------------------------
function checkVictory() {
  var totalMines = gLevel.MINES
  var flaggedMines = gFlaggedMines
  var shownCount = gGame.shownCount
  var size = gLevel.SIZE
  if (flaggedMines === totalMines || shownCount === size ** 2 - totalMines) {
    var isVictory = gFlaggedMines === gLevel.MINES
    if (isVictory) {
      clearInterval(gTimerInterval)
      gGame.isOn = false
      renderEmoji(WINNER)

      var elImg = document.querySelector('.end')
      elImg.style.display = 'block'
      elImg.src = 'imgs/win.png'
    }
  }
}
