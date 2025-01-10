let board = []
let completedCells = []
let currentPlayer = 0;
let players = [{ "color": "#700000", "letter": "X" }, { "color": "#00705a", "letter": "O" }]
let catsGame = { "color": "orange", "letter": "/" }
let gameComplete = false;
let currentBox = -1;

reset();


function checkForMiniBoardWin(boardNum) {
    let claims = document.getElementsByClassName("major-claim");
    let boardInfo = structuredClone(board).splice(boardNum * 9, 9);
    console.log(boardInfo)
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for (let i = 0; i < wins.length; i++) {
        if (boardInfo[wins[i][0]] == boardInfo[wins[i][1]] && boardInfo[wins[i][0]] == boardInfo[wins[i][2]] && boardInfo[wins[i][0]] != null) {
            let claimMarker = claims[boardNum];
            console.log(boardInfo[wins[i][0]]);
            claimMarker.style.backgroundColor = players[boardInfo[wins[i][0]]].color;
            claimMarker.innerHTML = players[boardInfo[wins[i][0]]].letter;
            claimMarker.setAttribute("owner",boardInfo[wins[i][0]])
            claimMarker.classList.add("claimed");
            completedCells[boardNum] = boardInfo[wins[i][0]];
            checkForFullBoardWin();
            return;
        }
    }
    let allFilled = true;
    for (let i = 0; i < 9; i++) {
        if (boardInfo[i] === undefined) {
            allFilled = false;
        }
    }
    if (allFilled) {
        let claimMarker = claims[boardNum];
        claimMarker.style.backgroundColor = catsGame.color;
        claimMarker.innerHTML = catsGame.letter;
        claimMarker.setAttribute("owner",2)
        claimMarker.classList.add("claimed");
        completedCells[boardNum] = 2;
    }
}

function checkForFullBoardWin() {
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for (let i = 0; i < wins.length; i++) {
        if (completedCells[wins[i][0]] == completedCells[wins[i][1]] && completedCells[wins[i][0]] == completedCells[wins[i][2]] && completedCells[wins[i][0]] != null && completedCells[wins[i][0]] != 2) {
            let winner = completedCells[wins[i][0]];
            gameComplete = true;
            document.getElementById("instructions").innerHTML = `<span style='color:${players[winner].color};font-weight:bold'>${players[winner].letter}</span> has won the game.`
            document.getElementsByClassName("win")[0].style.backgroundColor = players[winner].color;
            document.getElementsByClassName("win")[0].innerHTML = `<div><span style='font-weight:bold'>${players[winner].letter}</span> has won the game.</div><div class="reset">Play Again</div>`;
            document.getElementsByClassName("win")[0].classList.add("claimed")
            document.getElementsByClassName("reset")[0].addEventListener("click",function(e) {
                reset();
            });
            return;
        }
    }
    let allFilled = true;
    for (let i = 0; i < 9; i++) {
        if (completedCells[i] === undefined) {
            allFilled = false;
        }
    }
    if (allFilled) {
        gameComplete = true;
        document.getElementById("instructions").innerHTML = `Game has ended in a Tie.`
        document.getElementsByClassName("win")[0].style.backgroundColor = catsGame.color;
        document.getElementsByClassName("win")[0].innerHTML = `<div>Game has ended in a Tie.</div><div class="reset">Play Again</div>`;
        document.getElementsByClassName("win")[0].classList.add("claimed")
        document.getElementsByClassName("reset")[0].addEventListener("click",function(e) {
            reset();
        });
    }
}

function reset() {
    board = [];
    completedCells = [];
    currentPlayer = 0;
    gameComplete = false;
    currentBox = -1;

    if (localStorage.playerData == null) localStorage.playerData = JSON.stringify(players);
    if (localStorage.catsGameInfo == null) localStorage.catsGameInfo = JSON.stringify(catsGame);
    
    players = JSON.parse(localStorage.playerData);
    catsGame = JSON.parse(localStorage.catsGameInfo);
    document.getElementById("player1color").value = players[0].color;
    document.getElementById("player1letter").value = players[0].letter;
    document.getElementById("player2color").value = players[1].color;
    document.getElementById("player2letter").value = players[1].letter;
    document.getElementById("catscolor").value = catsGame.color;
    document.getElementById("catsletter").value = catsGame.letter;
    
    document.getElementById("currentPlayer").innerHTML = players[currentPlayer].letter;
    document.getElementById("currentPlayer").style.color = players[currentPlayer].color;

    let code = "";
    for (let i = 0; i < 9; i++) {
        code += '<div class="mini-board"><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="cell"><div class="claim"></div></div><div class="major-claim"></div></div>'
    }
    code += '<div class="win"></div>';
    document.getElementsByClassName("board")[0].innerHTML = code;
    let inputs = document.getElementsByClassName("setting-input")
    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function (e) {
            let cell = Math.floor(i / 9);
            if (completedCells[cell] != null) return;
            if (board[i] != null) return;
            if (gameComplete) return;
            if (cell != currentBox && currentBox != -1) return;
            let claimMarker = this.children[0];
            claimMarker.style.backgroundColor = players[currentPlayer].color;
            claimMarker.innerHTML = players[currentPlayer].letter;
            claimMarker.setAttribute("owner",currentPlayer)
            claimMarker.classList.add("claimed");
            board[i] = currentPlayer;
            currentPlayer = currentPlayer ? 0 : 1;
            document.getElementById("currentPlayer").innerHTML = players[currentPlayer].letter;
            document.getElementById("currentPlayer").style.color = players[currentPlayer].color;
            checkForMiniBoardWin(cell);
            if (document.getElementsByClassName("tint")[0]) document.getElementsByClassName("tint")[0].classList.remove("tint");
            let newCell = i % 9;
            let instructions = "Place your letter in the highlighted area."
            if (completedCells[newCell] != null) {
                instructions = "Place your letter wherever you would like."
                currentBox = -1;
            } else {
                document.getElementsByClassName("mini-board")[newCell].classList.add("tint");
                currentBox = newCell;
            }
            if (!gameComplete) document.getElementById("instructions").innerHTML = instructions;
        });
    }
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", function (e) {
            if (this.id == "player1color") players[0].color = this.value;
            if (this.id == "player1letter") players[0].letter = this.value;
            if (this.id == "player2color") players[1].color = this.value;
            if (this.id == "player2letter") players[1].letter = this.value;
            if (this.id == "catscolor") catsGame.color = this.value;
            if (this.id == "catsletter") catsGame.letter = this.value;
            localStorage.playerData = JSON.stringify(players);
            localStorage.catsGameInfo = JSON.stringify(catsGame);
            let claims = document.querySelectorAll(".major-claim, .claim");
            for (let i = 0; i < claims.length; i++) {
                if (claims[i].getAttribute("owner") - 0 == 2) {
                    claims[i].style.backgroundColor = catsGame.color;
                    claims[i].innerHTML = catsGame.letter;
                } else if (claims[i].getAttribute("owner") != null) {
                    claims[i].style.backgroundColor = players[claims[i].getAttribute("owner") - 0].color;
                    claims[i].innerHTML = players[claims[i].getAttribute("owner") - 0].letter;
                }
            }
        });
    }

    document.getElementById("instructions").innerHTML = "Place your letter wherever you would like."
}
