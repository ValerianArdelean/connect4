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
        }
    }
}

function setMessage(message, color) {
    element = document.getElementById("message");
    element.children[0].innerText = message;
    element.children[0].style.color = color;
}
/*
 if (mt[i][1 + j] == color && mt[i][2 + j] == color &&
     mt[i][3 + j] == color && mt[i][4 + j] == color) {
     return true;
 }
 if (mt[6 - j][l] == color && mt[5 - j][l] == color &&
     mt[4 - j][l] == color && mt[3 - j][l] == color) {
     return true;
 }
 */
function checkWinner(color) {/*checking rows and columns*/
    for (let i = LINES_NO, l = 1; i >= 1 || l <= COLUMNS_NO; --i, ++l) {
        for (let j = 0; j < FOUR; ++j) {
            if (mt[i][ONE + j] == color && mt[i][TWO + j] == color &&
                mt[i][THREE + j] == color && mt[i][FOUR + j] == color) {
                return true;
            }
            if (mt[LINES_NO - j][l] == color && mt[LINES_NO - 1 - j][l] == color &&
                mt[FOUR - j][l] == color && mt[THREE - j][l] == color) {
                return true;
            }
        }
    }/*checking paralels to main diagonal*/
    for (let i = 0; i < THREE; ++i) {
        for (let j = 0; j < FOUR; ++j) {/*above main diagon */
            if (j < FOUR - 1 &&
                mt[ONE + i][ONE + j + i] == color && mt[TWO + i][TWO + j + i] == color &&
                mt[THREE + i][THREE + j + i] == color && mt[FOUR + i][FOUR + j + i] == color) {
                return true;
            }/*below main diagon*/
            if (j < TWO && i < TWO &&
                mt[TWO + j][ONE] == color && mt[THREE + j][TWO] == color &&
                mt[FOUR + j][THREE] == color && mt[LINES_NO - 1 + j][FOUR] == color) {
                return true;
            }/*above second diagon */
            if (mt[ONE + i][(COLUMNS_NO - j) - i] == color && mt[TWO + i][(LINES_NO - j) - i] == color &&
                mt[THREE + i][(LINES_NO - 1 - j) - i] == color && mt[FOUR + i][(FOUR - j) - i] == color) {
                return true;
            }/*below second diagon*/
            if (i < TWO && j < TWO &&
                mt[(TWO + j) + i][COLUMNS_NO - i] == color && mt[(THREE + j) + i][LINES_NO - i] == color &&
                mt[(FOUR + j) + i][LINES_NO - 1 - i] == color && mt[(LINES_NO - 1 + j) + i][FOUR - i] == color) {
                return true;
            }
        }
    }
    return false;
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
