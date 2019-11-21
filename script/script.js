class PlayingField {
    fillCell(ceil, symbol) {
        ceil.textContent = symbol;
        ceil.classList.add("field__ceil_filled");
    }
    drawPlayerName() {
        const playerBlock = document.createElement("div");
        const namePlace = document.createElement("span")
        playerBlock.classList.add("field__players");
        playerBlock.textContent = "Current player : ";
        playerBlock.append(namePlace);

        return playerBlock;
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
        this.field.append(this.drawPlayerName());

        for (let i = 0; i < 3; i++) {
            this.field.append(this.drawRow());
        }
        
        return this.field;
    }
}
  
class TicTacToe {
    constructor(player1, player2) {
        this.symbolsOfMoves = ["X", "0"];
        this.playerNames = [player1, player2];
        this.currentOrder = 0;
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
        
        winnersComb
            .forEach((item) => {
                const ceils = this.playField.field.querySelectorAll(".field__ceil");
                const ceilTxt = item.map((item) => ceils[item].textContent);

                if (ceilTxt.every(item => item === ceilTxt[0] && item != "")) {
                    item.map((item) => ceils[item])
                        .forEach(ceil => ceil.classList.add("field__ceil_win"));
                    this.endGame();
                }
            });
    }
    changeNamePlayer() {
        this.playField.field
            .querySelector(".field__players > span")
            .textContent = this.playerNames[this.currentOrder];
    }
    makeStep(ceil) {
        this.playField.fillCell(ceil, this.symbolsOfMoves[this.currentOrder]);
        this.changeNamePlayer();
        this.currentOrder >= 1 ? this.currentOrder = 0 : this.currentOrder++;
        this.checkWinners();
    }
    startGame() {
        this.playField = new PlayingField();
        this.playField.drawField();
        this.changeNamePlayer();
        this.stepHandler = ({target}) => this.makeStep(target);
        [...this.playField.field.querySelectorAll(".field__ceil")]
            .forEach(i => i.addEventListener("click", this.stepHandler, {"once": true}));
        return this.playField.field;
    }
}

class Aauthorization {
    createAuthorizationModal() {
        this.modal = document.createElement("div");
        const modalInner = `
            <div class="field__authorization-input">
                <input type="text" placeholder="First player name">
            </div>
            <div class="field__authorization-input">
                <input type="text" placeholder="Second player name">
            </div>
            <button type="button" class="field__authorization-button">Let's Play</button>
        `;
        this.modal.classList.add("field__authorization");
        this.modal.innerHTML = modalInner;
    }
    checkInputs(inputValues) {
        return inputValues.filter(v => (/[A-Za-z0-9_-]{1,8}/.test(v))).length > 1;
    }
    startAuthorization() {
        this.createAuthorizationModal();
        this.modal.querySelector(".field__authorization-button")
            .addEventListener("click", () => {
                const playerNames = [...this.modal.querySelectorAll("input")].map(item => item.value);

                if (!this.checkInputs(playerNames)) {
                    console.log("invalid name");
                    return false;
                }

                const playSession = new TicTacToe(playerNames[0], playerNames[1]).startGame();

                document.querySelector(".field-wrap").append(playSession);
                this.modal.remove();
            });
        
        document.body.append(this.modal);
    }
}

new Aauthorization().startAuthorization();
