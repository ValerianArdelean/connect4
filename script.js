let columns = [0, 0, 0, 0, 0, 0, 0, 0];
function col(id) {
    id = parseInt(id);
    columns[id] += 1;
    let col = document.getElementById(id);
    col.children[6 - columns[id]].style.backgroundColor = "gray";
    console.log(id, columns[id], col.children[6 - columns[id]]);
}
