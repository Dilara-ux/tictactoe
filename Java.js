const board = document.getElementById('board'); // Um die Zellen innerhalb des Board Elements a
// die gesamte spiel logik 

// In diesem Array werden alle Zellen Elemente gespeichert
const cells = [];

let currentPlayer = "X";
let xMoves = [];
let oMoves = [];

const winningCombinations = [ // Alle möglichen Gewinnkombinationen
    // Reihen
    [0, 1, 2], // Erste Reihe
    [3, 4, 5], // Zweite Reihe
    [6, 7, 8], // Dritte Reihe
    // Spalten
    [0, 3, 6], // Erste Spalte
    [1, 4, 7], // Zweite Spalte
    [2, 5, 8], // Dritte Spalte
    // Diagonalen
    [0, 4, 8], // Erste Diagonale
    [2, 4, 6] // Zweite Diagonale
];

/*erstellt ein kästchen lässt 9 durchlaufen das man 9 kästchen sieht */
function createBoard() {
    for (let i = 0; i < 9; i++) { // Wir brauchen 9 Zellen, also von 0 bis 8
        const cell = document.createElement('div'); // Erstelle ein neues Div -> Wird neue Zelle
        cell.classList.add('cell'); // Füge die cell CSS-Klasse hinzu, damit unser definiertes
        board.appendChild(cell); // Die neue Zelle soll ein Child unseres Board-Divs sein (<div
        cells.push(cell); // Die neues Zelle wird in das cells Array gepusht (am Ende angehängt
        cell.addEventListener('click', () => makeMove(i));

    }
}

function makeMove(i) {
    if (cells[i].textContent === '') {


        cells[i].textContent = "X";
        cells[i].style.backgroundColor = 'lightblue';
        xMoves.push(i);


        gameFinished();  // schaue wer gewonnen hat und wenn nicht macht der BOT weiter 
        botMove();
        gameFinished();

    }
}

function botMove() { // computer macht sein zug 

    const index = 5;

    cells[index].textContent = currentPlayer = "0";
    cells[index].style.backgroundColor = 'lightcoral';
    oMoves.push(index);
}

function gameFinished() {
    // Im folgenden checken wir, ob es einen Gewinner gibt
    // Dazu überprüfen wir, ob einer der Spieler 3 Symbole in einer Reihe hat
    // Dazu haben wir ein Array mit allen möglichen Gewinnkombinationen
    // Wir überprüfen, ob einer der Spieler 3 Züge in einer der Kombinationen hat
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (combination.every((value) => xMoves.includes(value))) { // Überprüfe ob alle Werte der
            finishGame('Player X wins!');
        }
        if (combination.every((value) => oMoves.includes(value))) { // Überprüfe ob alle Werte der
            finishGame('Player O wins!');
        }
    }
    //überprüfen wir, ob das Spiel unentschieden ist
    // Wenn ja, ist das Spiel unentschieden
    const totalMoves = xMoves.length + oMoves.length;
    if (totalMoves === 9) {
        finishGame('Unentschieden');
    }
}

function finishGame(text) {
    setTimeout(() => {
        if (!alert(text)) { window.location.reload(); } // Wenn das Spiel zuende ist, wird eine Alert Bo
    }, 100);
}

// Die Funktion createBoard wurde zwar definiert aber wird hier aufgerufen
createBoard();

gameFinished();