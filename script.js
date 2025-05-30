const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "♚";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "♚") ? "♘" : "♚";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            cells[condition[0]].style.backgroundColor = "#4daf51";  
            cells[condition[1]].style.backgroundColor = "#4daf51";  
            cells[condition[2]].style.backgroundColor = "#4daf51";
            cells[condition[0]].style.color = "white";
            cells[condition[1]].style.color = "white";
            cells[condition[2]].style.color = "white";
            cells[condition[0]].style.fontSize = "2.5em";
            cells[condition[1]].style.fontSize = "2.5em";
            cells[condition[2]].style.fontSize = "2.5em";
            cells[condition[0]].style.transition = "0.5s";
            cells[condition[1]].style.transition = "0.5s";
            cells[condition[2]].style.transition = "0.5s";

            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "♚";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    cells.forEach(cell => cell.style.backgroundColor = "white");
    cells.forEach(cell => cell.style.color = "black");
    running = true;
}