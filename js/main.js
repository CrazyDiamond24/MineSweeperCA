'use strict'
//general basic foundation
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
  var board = []
  for (var i = 0; i < size; i++) {
    board[i] = []
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        isShown: false,
        isMine: false,
        isMarked: false,
        minesAround: '', 
        i: i,
        j: j, //check later if to keep these
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
  if (elCell.isShown) return
  elCell.minesAround = setMinesNegsCount(gBoard, i, j)

  if (!isTimerOn) {
    startTimer(Date.now())
    isTimerOn = !isTimerOn
  }
  if (elCell.isMarked) return

  
  //this is bugged - first cell clicked doesn't immediately render the number (it shows on 2nd click)
  //   if (gIsFirstClick) {
      //     placeMines()
      //     renderBoard()
      //     if (elCell.isMine) return
      //     gIsFirstClick = false
      //   }
      
//if no negs - expand 1st degree negs
  if (!elCell.minesAround) {
    elCell.isShown = true
    expandShown(gBoard, i, j)
  }

  //if the cell has negs - reveal it with the count of mines
  if (!elCell.isMine) {
    elCell.isShown = true
    elCell.minesAround = setMinesNegsCount(gBoard, i, j)
    console.log(elCell.minesAround)
    elCell.innerText = elCell.minesAround
  }

  //BUGGED if MINE - reveal the mine - call game over
  if (elCell.isMine) {
    //do the 3 lives later
    elCell.isShown = true
    // renderCell(MINE)
    gGame.shownCount++
    //do the smiley
    //call game over
  }
  elCell.classList.add('revealed')
}

//----------------------------------------
function placeMines() {
  //loop and randomint
  for (var i = 0; i < gLevel.MINES; i++) {
    var row = getRandomIntInclusive(0, gLevel.SIZE - 1)
    var col = getRandomIntInclusive(0, gLevel.SIZE - 1)

    if (!gBoard[row][col].isMine) {
      gBoard[row][col].isMine = true
    } 
  }
}



//marking - works fine
//----------------------------------------
function onCellMarked(elCell) {
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



//expand cell to 1st degree if it does not have mines around it
//works fine, but doesn't show minesAround
function expandShown(board, i, j) {
  if (board[i][j].minesAround === '') {
    for (var k = i - 1; k <= i + 1; k++) {
      if (k < 0 || k >= board.length) continue
      for (var l = j - 1; l <= j + 1; l++) {
        if (l < 0 || l >= board[0].length) continue
        if (!board[k][l].isShown && board[k][l].minesAround === '') {
          board[k][l].isShown = true
          var elCell = document.querySelector(`td.cell${k}-${l}`)
          elCell.classList.add('revealed')
        }
      }
    }
  }
}


