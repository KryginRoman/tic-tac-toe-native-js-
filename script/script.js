class PlayingField {
    fillCell(ceil, symbol) {
        ceil.textContent = symbol;
        ceil.classList.add("field__ceil_filled");
    }
    drawRow() {
        const row = document.createElement("div");
        row.classList.add("field__row");
        
        for (let i = 0; i < 3; i++) {
            const ceil = document.createElement("div");
            ceil.classList.add("field__ceil");
            row.append(ceil);
        }
        
        return row;
    }
    drawField() {
        this.field = document.createElement("div");
        this.field.classList.add("field");
        
        for (let i = 0; i < 3; i++) {
            this.field.append(this.drawRow());
        }
        
        return this.field;
    }
}
  
class TicTacToe {
    constructor(player1, player2) {
        this.playField = new PlayingField();
        this.symbolsOfMoves = ["X", "0"];
        this.firstPlayerName = player1;
        this.secondPlayerName = player2;
        this.currentSymbol = 0;
    }
    endGame() {
        [...this.playField.field.querySelectorAll(".field__ceil")]
            .forEach(c => c.removeEventListener("click", this.stepHandler));
        console.log("game over");
    }
    checkWinners() {
    const winnersComb = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
      
    for (let i = 0; i < winnersComb.length; i++) {
        const allCeils = this.playField.field.querySelectorAll(".field__ceil");
        const ceilsText = [allCeils[winnersComb[i][0]].textContent, 
                    allCeils[winnersComb[i][1]].textContent, 
                    allCeils[winnersComb[i][2]].textContent
                    ];
        const ceils = [...ceilsText].every(item => item === ceilsText[0] && item != "");
        
        if (ceils) {
            allCeils[winnersComb[i][0]].classList.add("field__ceil_win");
            allCeils[winnersComb[i][1]].classList.add("field__ceil_win");
            allCeils[winnersComb[i][2]].classList.add("field__ceil_win");
            this.endGame();
            break;
        }
      }
    }
    makeStep(ceil) {
        this.playField.fillCell(ceil, this.symbolsOfMoves[this.currentSymbol]);
        this.currentSymbol >= 1 ? this.currentSymbol = 0 : this.currentSymbol++;
        this.checkWinners();
    }
    startGame() {
        const filed = this.playField.drawField();
        this.stepHandler = ({target}) => this.makeStep(target);
        [...filed.querySelectorAll(".field__ceil")]
            .forEach(i => i.addEventListener("click", this.stepHandler, {"once": true}));
        return filed;
    }
}