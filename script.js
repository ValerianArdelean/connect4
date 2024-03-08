const linesNo = 6, columnsNo = 7, four = 4;
let columns = [0, 0, 0, 0, 0, 0, 0, 0];
let pen = "", opo = "", winner = "";
let clicks = {
    red: 0,
    yellow: 0,
};
let mt = [[], [], [], [], [], [], []];
for (let i = 1; i <= 6; ++i) {
    mt[i] = [];
}

function setMessage(message, color) {
    element = document.getElementById("message");
    element.children[0].innerText = message;
    element.children[0].style.color = color;
}

function checkWinner(color) {/*checking rows and columns*/
    for (let i = linesNo, l = 1; i >= 1 || l <= columnsNo; --i, ++l) {
        for (let j = 0; j < four; ++j) {
            if (mt[i][1 + j] == color && mt[i][2 + j] == color &&
                mt[i][3 + j] == color && mt[i][4 + j] == color) {
                return true;
            }
            if (mt[6 - j][l] == color && mt[5 - j][l] == color &&
                mt[4 - j][l] == color && mt[3 - j][l] == color) {
                return true;
            }
        }
    }/*checking paralels to main diagonal*/
    for (let i = 0; i < four - 1; ++i) {
        for (let j = 0; j < four; ++j) {/*above main diagon */
            if (j < four - 1 &&
                mt[1 + i][1 + j + i] == color && mt[2 + i][2 + j + i] == color &&
                mt[3 + i][3 + j + i] == color && mt[4 + i][4 + j + i] == color) {
                return true;
            }/*below main diagon*/
            if (j < 2 && i < 2 &&
                mt[2 + j][1] == color && mt[3 + j][2] == color &&
                mt[4 + j][3] == color && mt[5 + j][4] == color) {
                return true;
            }/*above second diagon */
            if (mt[1 + i][(7 - j) - i] == color && mt[2 + i][(6 - j) - i] == color &&
                mt[3 + i][(5 - j) - i] == color && mt[4 + i][(4 - j) - i] == color) {
                return true;
            }/*below second diagon*/
            if (i < 2 && j < 2 &&
                mt[(2 + j) + i][7 - i] == color && mt[(3 + j) + i][6 - i] == color &&
                mt[(4 + j) + i][5 - i] == color && mt[(5 + j) + i][4 - i] == color) {
                return true;
            }
        }
    }
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
            document.getElementById(id).children[linesNo - columns[id]].style.backgroundColor = pen;
            mt[columnsNo - columns[id]][id] = pen;
            ++clicks[pen];
            clicks[opo] = 0;
            winner = checkWinner(pen);
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
