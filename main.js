'use strict'
//Game Functionality
//～*～♡～*～♥～*～♡～*～♥～*～♡～*～♥～*～♡～*～//

//Elements
//----------------------------------------
const MINE = `<img src="imgs/bomb.gif" class="danger">`

const FLAG = '🚩'
const EMPTY = ''

//Global Variables
//----------------------------------------
var gLevel = {
  SIZE: 8,
  MINES: 12,
}

var gIsFirstClick = true
var gFlaggedMines
var gTimerInterval
var gLives = 3

//global variable for special beginner mode
var gBeginnerLives = 2
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
    gGame.shownCount++
    cell.minesAround = setMinesNegsCount(gBoard, i, j)
    if (!cell.minesAround) {
      expandShown(gBoard, i, j)
    }
    elCell.innerText = cell.minesAround
  }

  if (cell.isMine) {
    checkLives(i, j, gLevel.MINES)
    cell.isShown = true
    renderCell(pos, MINE)
  }

  checkVictory()
  elCell.classList.add('revealed')
}

//----------------------------------------
function placeMines(i, j) {
  var mines = gLevel.MINES
  while (mines > 0) {
    var row = getRandomIntInclusive(0, gLevel.SIZE - 1)
    var col = getRandomIntInclusive(0, gLevel.SIZE - 1)
    if (row === i && col === j) {
      continue
    }
    if (!gBoard[row][col].isMine) {
      gBoard[row][col].isMine = true
      mines--
    }
  }
}

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

    var totalCellCount = gLevel.SIZE ** 2
    var usedCells = gGame.shownCount + gFlaggedMines
    if (usedCells === totalCellCount) checkVictory()
  }
}

//+Bonus
//----------------------------------------
function expandShown(board, i, j) {
  for (var k = i - 1; k <= i + 1; k++) {
    if (k < 0 || k >= board.length) continue
    for (var l = j - 1; l <= j + 1; l++) {
      if (l < 0 || l >= board[0].length) continue
      if (!board[k][l].isShown) {
        board[k][l].isShown = true
        //get the number
        board[k][l].minesAround = setMinesNegsCount(board, k, l)
        //get the cell and update text
        var elCell = document.querySelector(`td.cell${k}-${l}`)
        elCell.innerText = board[k][l].minesAround
        elCell.classList.add('revealed')
        gGame.shownCount++
        //recrusively call the function if the cell has no mines around
        if (board[k][l].minesAround === '') {
          expandShown(board, k, l)
        }
      }
    }
  }
}

//----------------------------------------
function checkLives(i, j, mines) {
  if (!gLives) return
  if (gBoard[i][j].isMine && gLives !== 0) {
    gLives--

    var elLives = document.querySelector('.lives')
    if (gLives === 2) {
      if (mines === 2) {
        gBeginnerLives = 1
        renderEmoji(TERRIFIED)
      } else {
        elLives.innerText = '🧡🧡'
        renderEmoji(SCARED)
      }
    }
    if (gLives === 1) {
      if (mines === 2) {
        gLives = 0
      } else {
        elLives.innerText = '🧡'
        renderEmoji(TERRIFIED)
      }
    }
    if (gLives === 0 || gBeginnerLives === 0) {
      elLives.innerText = '💔'
      gameOver()
    }
  }
}
