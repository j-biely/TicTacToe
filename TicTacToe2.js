var tdcell = document.querySelectorAll('.tdcell')

const restbtn = document.getElementById("restartb");
const gameStatus = document.getElementById('gameStatus');

var xbtn = document.querySelector("#xbtn")
var obtn = document.querySelector("#obtn")

var xEnabled = "btn btn-light btn-lg";
var oEnabled = "btn btn-dark btn-lg";
var xDisabled = "btn btn-light btn-lg disabled";
var oDisabled = "btn btn-dark btn-lg disabled";

//round variables
var roundNo = 0;
var clicked = false;
// var clickedO = false;
// var clickedX = false;
var xRound = false;
var oRound = false;
var xWon = false;
var oWon = false;
var draw = false;
var game = false;
//variables for Win Check
var wonCombinations = [[0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                        [0, 3, 6],
                        [1, 4, 7],
                        [2, 5, 8],
                        [0, 4, 8],
                        [2, 4, 6]];

var xCombination = [];
var oCombination = [];

var wonIndexes = [3];

//Running the functionns

restbtn.addEventListener("click", clearTheField);
xbtn.addEventListener("click", xButton);
obtn.addEventListener("click", oButton);

//Functions

function clearTheField() {
  roundNo = 0;
  xCombination = [];
  oCombination = [];
  xRound = false;
  oRound = false;
  xWon = false;
  oWon = false;
  clicked = false;
  for (var i = 0; i < tdcell.length; i++) {
    tdcell[i].textContent = " "
    tdcell[i].style.backgroundColor = 'white';
    tdcell[i].removeEventListener('click', clickO);
    tdcell[i].removeEventListener('click', clickX);
  }
  game = false;
  disableXo(xRound, oRound, clicked, roundNo, game);
  console.log("cleared the field");

}

function xButton() {
  console.log("clicked x");
  game = true;
  roundSwitcher(1);
  playerMove(xRound, oRound);
  if (clicked) {
    disableXo(xRound, oRound);
  }
}

function oButton() {
  console.log("clicked o");
  game = true;
  roundSwitcher(0);
  playerMove(xRound, oRound);
  if (clicked) {
    disableXo(xRound, oRound);
  }
}

function roundSwitcher(s) {
  if (s==1) {
    console.log("x round");
    roundNo++;
    oRound=false;
    xRound=true;
  } else if (s==0) {
    console.log("o round");
    roundNo++;
    oRound=true;
    xRound=false;
  } else {
    console.log("round switch error");
  }
}

function playerMove(xRound, oRound) {
  if (xRound==true && roundNo<=9) {
    console.log("x round move");
    for (var i = 0; i < tdcell.length; i++) {
        tdcell[i].removeEventListener('click', clickO);
        tdcell[i].addEventListener('click', clickX);
      }
    disableXo(xRound, oRound);
  } else if (oRound==true  && roundNo<=9) {
    console.log("o round move");
    for (var i = 0; i < tdcell.length; i++) {
        tdcell[i].removeEventListener('click', clickX);
        tdcell[i].addEventListener('click', clickO);
      }
    disableXo(xRound, oRound);
  } else {
    console.log("player move error");

  }
  clicked=false;
}

function clickX() {
  if (this.textContent==" " && !clicked) {
    this.textContent = "X";
    this.style.color = 'black';
    this.style.backgroundColor = "#F1F7F8";
    xCombination.push(parseInt(this.getAttribute('cell-index')));
    clicked=true;
    checkWon(roundNo);
    }

  disableXo(xRound, oRound, clicked, roundNo, game);
}

function clickO() {
  if (this.textContent==" " && !clicked) {
    this.textContent = "O";
    this.style.color = 'black';
    this.style.backgroundColor = "#B6BCC1";
    oCombination.push(parseInt(this.getAttribute('cell-index')));
    clicked=true;
    checkWon(roundNo);
    }

  disableXo(xRound, oRound, clicked, roundNo, game);
}

function checkWon(roundNo) {

  if (roundNo>=5 && roundNo<9) {
    console.log("checked won");
    if (xRound && game) { // && clicked ?
      console.log("checked x combinations")
      // uziać xKambinacyju, i paraunać jaje z usimi wonCombinations
      // jak paraunać.
      var isXw = isCombWin(xCombination, wonCombinations);
      if (isXw==true) {
        console.log("checked - x won");
        xWon = true;
        endGame();
      }

    } else if (oRound && game) {
        console.log("checked o combinations")
        var isOw = isCombWin(oCombination, wonCombinations);

        if (isOw==true) {
          console.log("checked - o won");
          oWon = true;
          endGame();
        }
      }
    } else if (roundNo>=9) {
    console.log("draw");
    draw = true;
    // xWon = false;
    // oWon = false;
    endGame()
    }

}

function isCombWin(comb, wonCombinations) {
  console.log("is comb win?")
  console.log(comb);
  // if (comb.length<3) {
  //   return false;
  // }
  comS = comb.sort();

  for (let m = 0; m < wonCombinations.length; m++) {
    var wCo = wonCombinations[m];
    // console.log("won Combination:");
    // console.log(wCo);
    let checker = (comb, wCo) => wCo.every(v => comb.includes(v));
      if (checker(comb,wCo)) {
        console.log("yes");
        wonIndexes = wCo;
        return true;
      }
    }
  console.log("no");
  return false;

}

function disableXo(xRound, oRound, clicked, roundNo, game) {
  if (!game && roundNo==0) {
    xbtn.className=xEnabled;
    obtn.className=oEnabled;

    gameStatus.innerHTML = "You can choose X or O";
  } else if (!game) {
    xbtn.className=xDisabled;
    obtn.className=oDisabled;

    // gameStatus.innerHTML = "";
  } else if (game==true && !clicked) {
    xbtn.className=xDisabled;
    obtn.className=oDisabled;

    gameStatus.innerHTML = "your turn!";
  } else if (xRound && clicked && game) {
    xbtn.className=xDisabled;
    obtn.className=oEnabled;

    gameStatus.innerHTML = "click O to start O move";
  } else if (oRound && clicked && game) {
    xbtn.className=xEnabled;
    obtn.className=oDisabled;

    gameStatus.innerHTML = "click X to start X move";
  } else if (!xRound && !oRound && game) {
    xbtn.className=xEnabled;
    obtn.className=oEnabled;

    gameStatus.innerHTML = "Choose your side";
  } else {
    console.log("wrong disableXo argument");
  }

}

function endGame() {
  game = false;
  if (xWon) {
    alert("x won!");
    xRound=false;
    oRound=false;

    for (var i = 0; i < tdcell.length; i++) {
        tdcell[i].removeEventListener('click', clickX);
        tdcell[i].removeEventListener('click', clickO);
      }
    gameStatus.innerHTML = "X won. Clear the field for restart";
    paintWon(wonIndexes);
  } else if (oWon) {
    alert("o won!");
    xRound=false;
    oRound=false;

    for (var i = 0; i < tdcell.length; i++) {
        tdcell[i].removeEventListener('click', clickX);
        tdcell[i].removeEventListener('click', clickO);
      }
    gameStatus.innerHTML = "O won. Clear the field for restart";
    paintWon(wonIndexes);
  } else if (draw) {
    alert("draw");
    xRound=false;
    oRound=false;

    for (var i = 0; i < tdcell.length; i++) {
        tdcell[i].removeEventListener('click', clickX);
        tdcell[i].removeEventListener('click', clickO);
      }
    gameStatus.innerHTML = "Draw. Clear the field for restart";
  }
  disableXo(xRound, oRound, clicked, roundNo, game);

}

function paintWon(wonIndexes) {
  for (var i = 0; i < tdcell.length; i++) {
    var cell = tdcell[i];
    for (var j = 0; j < 3; j++) {
      if (parseInt(cell.getAttribute("cell-index"))==wonIndexes[j]) {
        tdcell[i].style.backgroundColor = '#DC2F02';
      }
    }
  }
  console.log("painted");
}
