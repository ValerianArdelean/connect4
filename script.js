let pen = "", opo = "";
let clicks = {
    red: 0,
    yellow: 0,
};
let message = document.getElementById("message");

function buttons(color, oponent) {
    if (clicks[color] === 0) {
        pen = color;
        opo = oponent;
        message.children[0].style.color = color;
        message.children[0].innerText = `you chosen ${pen}`;
        console.log(clicks[color]);
    } else {
        message.children[0].innerText = "don't try on cheating !";
    }
}

let columns = [0, 0, 0, 0, 0, 0, 0, 0];
function col(id) {
    if (pen) {
        if (clicks[pen] === 0) {
            id = parseInt(id);
            columns[id] += 1;
            let col = document.getElementById(id);
            col.children[6 - columns[id]].style.backgroundColor = pen;
            ++clicks[pen];
            clicks[opo] = 0;
        } else {
            message.children[0].innerText = "change color !!";
        }
    } else {
        message.children[0].innerText = "choose a color first !!!";
    }
}
