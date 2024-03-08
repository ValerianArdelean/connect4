const LINES_NO = 6, COLUMNS_NO = 7, FOUR = 4, THREE = 3, TWO = 2, ONE = 1;
let columns = [0, 0, 0, 0, 0, 0, 0, 0];
let pen = "", opo = "", winner = "";
let clicks = {
    red: 0,
    yellow: 0,
};
let mt = [[], [], [], [], [], [], []];
for (let i = 1; i <= LINES_NO; ++i) {
    mt[i] = [];
}

function checkWinner2(color) {
    for (let i = 1; i <= COLUMNS_NO; ++i) {
        for (let j = 1; j <= 4; ++j) {
            if ((i <= LINES_NO && mt[i][j] == color && mt[i][j + 1] == color && mt[i][j + 2] == color && mt[i][j + 3] == color) ||
                (j <= 3 && mt[j][i]) == color && mt[j + 1][i] == color && mt[j + 2][i] == color && mt[j + 3][i] == color) {
                    return true;
            }
            if ((i <= 4 && j <= 3 && mt[j][j + i - 1] == color && mt[j + 1][j + 1 + i - 1] == color && mt[j + 2][j + 2 + i - 1] == color && mt[j + 3][j + 3 + i - 1] == color) ||
                (i <= 2 && mt[j + i][j] == color && mt[j + i + 1][j + 1] == color && mt[j + i + 2][j + 2] == color && mt[j + i + 3][j + 3] == color)) {
                return true;
            }
            if ((i <= 4 && j <= 3 && mt[j][(7 - j + 1) - i + 1] == color && mt[j + 1][(7 - j + 1) - i + 1 - 1] == color && mt[j + 2][(7 - j + 1) - i + 1 - 2] == color && mt[j + 3][(7 - j + 1) - i + 1 - 3] == color) ||
                (i <= 2 && mt[j + i][(7 - j + 1)] == color && mt[j + i + 1][(7 - j + 1) - 1] == color && mt[j + i + 2][(7 - j + 1) - 2] == color && mt[j + i + 3][(7 - j + 1) - 3] == color)) {
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
    if (clicks[color] === 0 && !winner) {
        pen = color;
        opo = oponent;
        setMessage("you chosen " + pen, color);
    } else if (!winner) {
        setMessage("don't try on cheating !", color);
    }
}

function col(id) {
    if (pen && !winner) {
        if (clicks[pen] === 0) {
            id = parseInt(id);
            ++columns[id];
            document.getElementById(id).children[LINES_NO - columns[id]].style.backgroundColor = pen;
            mt[COLUMNS_NO - columns[id]][id] = pen;
            ++clicks[pen];
            clicks[opo] = 0;
            winner = checkWinner2(pen);
            if (winner) {
                alert(`Felicitari !!! ${pen} a castigat !!!`);
                setMessage(`Felicitari !!! ${pen} a castigat !!!`);
            }
        } else {
            setMessage("change color !!", "black");
        }
    } else if (!pen && !winner) {
        setMessage("choose a color first !!!", "black");
    }
}
