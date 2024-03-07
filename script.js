let pen = "";
function buttons(color) {
    pen = color;
}

let columns = [0, 0, 0, 0, 0, 0, 0, 0];
function col(id) {
    id = parseInt(id);
    columns[id] += 1;
    let col = document.getElementById(id);
    col.children[6 - columns[id]].style.backgroundColor = pen;
    console.log(id, columns[id], col.children[6 - columns[id]]);
}
