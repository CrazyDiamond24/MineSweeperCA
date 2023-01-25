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
//----------------------------------------
function buildBoard() {
  //start basic then add size options
  //change the 4 to 'size' and use the gLevel later
  //add 2 mines manually for now
  var board = []
  for (var i = 0; i < 4; i++) {
    board[i] = []
    for (var j = 0; j < 4; j++) {
      board[i][j] = {
        //each cell basic structure
        isShown: false,
        isMine: false,
        isMarked: false,
        minesAround: '',
        i: i,
        j: j, //check later if to keep these
      }
      //   TEMPORARY PLACEMENT - REMOVE LATER
      //   if (i === 3 && j === 0) board[i][j].isMine = true
      //   if (i === 1 && j === 1) board[i][j].isMine = true
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
  //if MINE - reveal the mine
  //if has negs - reveal it alone
  //if no negs - expand 1st degree negs

  //The first click is never a mine - place mines after it

  //this is bugged - first cell clicked doesn't immediately render the number (it shows on 2nd click)
  //another bug - it can open a mine on first click :/
  if (gIsFirstClick) {
    placeMines()
    if (elCell.isMine) return
    gIsFirstClick = false
    renderBoard()
  }
  if (!elCell.minesAround) expandShown(gBoard, i, j)
  
  //if the cell has negs - reveal it with the count of mines
  if (!elCell.isMine) {
    elCell.isShown = true
    elCell.minesAround = setMinesNegsCount(gBoard, i, j)
    console.log(elCell.minesAround)
    elCell.innerText = elCell.minesAround
  }
  elCell.classList.add('revealed')
}

function placeMines() {
  //loop and randomint
  for (var i = 0; i < gLevel.MINES; i++) {
    var row = getRandomIntInclusive(0, gLevel.SIZE - 1)
    var col = getRandomIntInclusive(0, gLevel.SIZE - 1)

    if (!gBoard[row][col].isMine) {
      gBoard[row][col].isMine = true
    } else {
      i--
    }
  }
}

//marking
//----------------------------------------
function onCellMarked(elCell) {
  if (!elCell.isShown) {
    if (!elCell.isMarked) {
      elCell.isMarked = true
      elCell.innerText = FLAG
    } else {
      elCell.isMarked = false
      elCell.innerText = EMPTY
    }
  }
}

//expand cell to 1st degree if it does not have mines around it

//----------------------------------------
function expandShown(board, i, j) {
    if (board[i][j].minesAround === '') {
      for (var k = i - 1; k <= i + 1; k++) {
        if (k < 0 || k >= board.length) continue;
        for (var l = j - 1; l <= j + 1; l++) {
          if (l < 0 || l >= board[0].length) continue;
          if(!board[k][l].isShown && board[k][l].minesAround === '') {
            board[k][l].isShown = true;
            var elCell = document.querySelector(`td.cell-${k}-${l}`);
            elCell.classList.add("revealed");
          }
        }
      }
    }
  }
  
  
