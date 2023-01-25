'use strict'
//All logic goes here

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gBoard = []

function onInit() {
    gGame.isOn = true

    gBoard = buildBoard()

    // placeMines()

    renderBoard()
}



//set difficulty here

//check victory 

//restart game and modal thing (win loss)

