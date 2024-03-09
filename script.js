const LINES_NO = 6, COLUMNS_NO = 7, FOUR = 4, THREE = 3, TWO = 2, ONE = 1;

let game = {
    columns: [0, 0, 0, 0, 0, 0, 0, 0],
    pen: "",
    opo: "",
    winner: "",
    clicks: {
        red: 0,
        yellow: 0,
    }
}

let mt = [[], [], [], [], [], [], [], []];
for (let i = 0; i <= COLUMNS_NO; ++i) {
    mt[i] = [];
}

function createCells() {
    let grid = document.getElementById("grid");
    grid.setAttribute("class", "flex");
    for (let i = 1; i <= COLUMNS_NO; ++i) {
        let column = document.createElement("div");
        column.setAttribute("id", i);
        column.setAttribute("class", "col");
        column.setAttribute("onclick", "col(this.id)");
        for (let j = 0; j < LINES_NO; ++j) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            column.appendChild(cell);
        }
        grid.appendChild(column);
    }
}

function checkWinner2(color) {
    for (let i = 1; i <= COLUMNS_NO; ++i) {
        for (let j = 1; j <= FOUR; ++j) {
            if ((i <= LINES_NO &&
                 mt[i][j] == color && mt[i][j + 1] == color &&
                 mt[i][j + TWO] == color && mt[i][j + THREE] == color) ||
                 (j <= THREE &&
                 mt[j][i]) == color && mt[j + 1][i] == color &&
                 mt[j + TWO][i] == color && mt[j + THREE][i] == color) {
                    return true;
            }
            if ((i <= FOUR && j <= THREE &&
                 mt[j][j + i - 1] == color &&
                 mt[j + 1][j + 1 + i - 1] == color &&
                 mt[j + TWO][j + TWO + i - 1] == color &&
                 mt[j + THREE][j + THREE + i - 1] == color) ||
                (i <= TWO && j <= TWO &&
                 mt[j + i][j] == color &&
                 mt[j + i + 1][j + 1] == color &&
                 mt[j + i + TWO][j + TWO] == color &&
                 mt[j + i + THREE][j + THREE] == color)) {
                    return true;
            }
            if ((i <= FOUR && j <= THREE &&
                 mt[j][(COLUMNS_NO - j + 1) - i + 1] == color &&
                 mt[j + 1][(COLUMNS_NO - j + 1) - i + 1 - 1] == color &&
                 mt[j + TWO][(COLUMNS_NO - j + 1) - i + 1 - 2] == color &&
                 mt[j + THREE][(COLUMNS_NO - j + 1) - i + 1 - THREE] == color) ||
                (i <= TWO && j <= TWO &&
                 mt[j + i][(COLUMNS_NO - j + 1)] == color &&
                 mt[j + i + 1][(COLUMNS_NO - j + 1) - 1] == color &&
                 mt[j + i + TWO][(COLUMNS_NO - j + 1) - TWO] == color &&
                 mt[j + i + THREE][(COLUMNS_NO - j + 1) - THREE] == color)) {
                    return true;
            }
        }
    }
    return false;
}

function setMessage(message, color) {
    element = document.getElementById("message");
    element.children[0].innerText = message;
    element.children[0].style.color = color;
}

function buttons(color, oponent) {
    if (game.clicks[color] === 0 && !game.winner) {
        game.pen = color;
        game.opo = oponent;
        setMessage("you chosen " + game.pen, game.color);
    } else if (!game.winner) {
        setMessage("don't try on cheating !", game.color);
    }
}

function col(id) {
    if (game.pen && !game.winner) {
        if (game.clicks[game.pen] === 0) {
            id = parseInt(id);
            ++game.columns[id];
            document.getElementById(id).children[LINES_NO - game.columns[id]].style.backgroundColor = game.pen;
            mt[COLUMNS_NO - game.columns[id]][id] = game.pen;
            ++game.clicks[game.pen];
            game.clicks[game.opo] = 0;
            game.winner = checkWinner2(game.pen);
            if (game.winner) {
                alert(`Felicitari !!! ${game.pen} a castigat !!!`);
                setMessage(`Felicitari !!! ${game.pen} a castigat !!!`, game.pen);
            }
        } else {
            setMessage("change color !!", "black");
        }
    } else if (!game.pen && !game.winner) {
        setMessage("choose a color first !!!", "black");
    }
}
