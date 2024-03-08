let pen = "", opo = "";
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

let columns = [0, 0, 0, 0, 0, 0, 0, 0];
function col(id) {
    if (pen) {
        if (clicks[pen] === 0) {
            id = parseInt(id);
            ++columns[id];
            let col = document.getElementById(id);
            col.children[6 - columns[id]].style.backgroundColor = pen;
            ++clicks[pen];
            clicks[opo] = 0;
        } else {
            setMessage("change color !!", "black");
        }
    } else {
        setMessage("choose a color first !!!", "black");
    }
}
