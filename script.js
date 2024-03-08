let pen = "", opo = "", winner = "";
let clicks = {
    red: 0,
    yellow: 0,
};

function setMessage(message, color) {
    element = document.getElementById("message");
    element.children[0].innerText = message;
    element.children[0].style.color = color;
}

function buttons(color, oponent) {
    if (clicks[color] === 0) {
        pen = color;
        opo = oponent;
        setMessage("you chosen " + pen, color);
    } else {
        setMessage("don't try on cheating !", color);
    }
}

let mt = ["0", "1", "2", "3", "4", "5", "6"];
for (let i = 1; i <= 6; ++i) {
    mt[i] = ["0", "1", "2", "3", "4", "5", "6", "7"];
}

let columns = [0, 0, 0, 0, 0, 0, 0, 0];
function col(id) {
    if (pen) {
        if (clicks[pen] === 0) {
            id = parseInt(id);
            ++columns[id];
            let col = document.getElementById(id);
            let cell = col.children[6 - columns[id]];
            cell.style.backgroundColor = pen;
            mt[7 - columns[id]][id] = pen;
            ++clicks[pen];
            clicks[opo] = 0;
            winner = checkWinner(pen);
            if (winner) {
                alert(`Felicitari !!! ${pen} a castigat !!!`);
            }
        } else {
            setMessage("change color !!", "black");
        }
    } else {
        setMessage("choose a color first !!!", "black");
    }
}

function checkWinner(color) {/*checking rows and columns*/
    for (let i = 6, l = 1; i >= 1 || l <= 7; --i, ++l) {
        for (let j = 0; j < 4; ++j) {
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
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j <= 3; ++j) {/*above main diagon */
            if (j < 3 && mt[1 + i][1 + j + i] == color && mt[2 + i][2 + j + i] == color &&
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
            if (i < 2 && j < 2 && mt[(2 - j) + i][7 - i] == color && mt[(3 - j) + i][6 - i] == color && mt[(4 - j) + i][5 - i] == color && mt[(5 - j) + i][4 - i] == color) {
                return true;
            }
        }
    }
}
