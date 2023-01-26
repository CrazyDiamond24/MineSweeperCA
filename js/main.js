'use strict'
//Game Functionality
//～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～//

//Elements
//----------------------------------------
const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''

//Global Variables
//----------------------------------------
var gLevel = {
  SIZE: 4,
  MINES: 2,
}

var gIsFirstClick = true
var gFlaggedMines
var gTimerInterval
var gLives
//----------------------------------------
function buildBoard(size) {
  const board = []
  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        isShown: false,
        isMine: false,
        isMarked: false,
        minesAround: '',
      }
    }
  }
  return board
}
//----------------------------------------
function setMinesNegsCount(board, rowIdx, colIdx) {
  var minesAround = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > board.length - 1) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > board[i].length - 1 || (i === rowIdx && j === colIdx))
        continue
      if (board[i][j].isMine) minesAround++
    }
  }
  if (!minesAround) minesAround = ''
  console.log('minesAround', minesAround)
  return minesAround
}

//----------------------------------------
function onCellClicked(elCell, i, j) {
  if (!gGame.isOn) return
  var cell = gBoard[i][j]
  if (cell.isShown) return
  if (elCell.isMarked) return

  if (!isTimerOn) {
    startTimer(Date.now())
    isTimerOn = !isTimerOn
  }

  if (gIsFirstClick) {
    placeMines(i, j)
    gIsFirstClick = false
  }

  var pos = { i, j }

  if (!cell.isMine) {
    cell.isShown = true
    cell.minesAround = setMinesNegsCount(gBoard, i, j)
    if (!cell.minesAround) {
      expandShown(gBoard, i, j)
    }
    elCell.innerText = cell.minesAround
  }

  if (cell.isMine) {
    if (gLives) {
      cell.isShown = true
      renderCell(pos, MINE)
      gGame.shownCount++
      renderEmoji(DEAD)
      gLives--
    } else {
      gameOver()
    }
    // TODO FIX THIS
    // isVictory()
  }
  elCell.classList.add('revealed')
}

//----------------------------------------
function placeMines(i, j) {
  console.log('placing')
  for (var i = 0; i < gLevel.MINES; i++) {
    var row = getRandomIntInclusive(0, gLevel.SIZE - 1)
    var col = getRandomIntInclusive(0, gLevel.SIZE - 1)
    if (row === i && col === j) {
      i--
      continue
    }
    if (!gBoard[row][col].isMine) {
      gBoard[row][col].isMine = true
    } else {
      i--
    }
  }
}

//marking
//----------------------------------------
function onCellMarked(ev, elCell) {
  ev.preventDefault()
  if (!elCell.isShown) {
    if (!elCell.isMarked) {
      elCell.isMarked = true
      elCell.innerText = FLAG
      gFlaggedMines++
    } else {
      elCell.isMarked = false
      elCell.innerText = EMPTY
      gFlaggedMines--
    }
  }
}
//----------------------------------------
function expandShown(board, i, j) {
  if (board[i][j].minesAround === '') {
    for (var k = i - 1; k <= i + 1; k++) {
      if (k < 0 || k >= board.length) continue
      for (var l = j - 1; l <= j + 1; l++) {
        if (l < 0 || l >= board[0].length) continue
        board[k][l].minesAround = setMinesNegsCount(board, k, l)
        if (!board[k][l].isShown) {
          board[k][l].isShown = true

          var elCell = document.querySelector(`td.cell${k}-${l}`)
          elCell.innerText = board[k][l].minesAround
          elCell.classList.add('revealed')
        }
      }
    }
  }
}

//Not implemented
//----------------------------------------
function checkLives() {
  var elLives = document.querySelector('.lives')

  if (!gLives) return
  if (gBoard[i][j].isMine && gLives !== 0) {
    gLives--
    if (gLives === 2) elLives.innerText = '❤️❤️'
    if (gLives === 1) elLives.innerText = '❤️'
    if (gLives === 0) elLives.innerText = '💔'
  }
  renderEmoji(DEAD)
  gGame.isOn = !gGame.isOn
}
