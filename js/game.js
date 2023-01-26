'use strict'
//All logic goes here
//----------------------------------------
const HAPPY = '😊'
const DEAD = '🥴'
const WINNER = '😎'
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
  // placeMines() //switch these after you're done coding
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
  switch (elMode.dataset.level) {
    case 'Beginner':
      gLevel.SIZE = 4
      gLevel.MINES = 2
      break
    case 'Medium':
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
  for (var i = 0; i < gMinesPos.length; i++) {
    var currMine = gMinesPos[i]
    gBoard[currMine.i][currMine.j].isShown = true
    renderClee(currMine, MINE)
  }
  renderEmoji(DEAD)
  //add modal
}
//----------------------------------------
function resetGame() {
  var timer = document.querySelector('.timer')
  timer.innerText = '00:00:00'
  clearInterval(gTimerInterval)
  if (gTimerInterval) gTimerInterval = null
  isTimerOn = !isTimerOn
  gMinesPos = []
  gGame.isOn = false
  onInit()
}

//check victory - if all mines are flagged + all cells are shown
//----------------------------------------
function isVictory() {
  var totalCellCount = gLevel.SIZE ** 2
  var usedCells = gGame.shownCount + gFlaggedMines
  var isWin = usedCells === totalCellCount ? true : false
  if (!isWin) return
  clearInterval(gTimerInterval)
  gGame.isOn = false
  renderEmoji(WINNER)
  //add modal
}
