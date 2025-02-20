const LINES_NO = 6;
const COLUMNS_NO = 7;
const NO_DIR = 4;
const THREE = 3;
const TWO = 2;
const ONE = 1;

let game = {
	columns: [0, 0, 0, 0, 0, 0, 0, 0],
	pen: "",
	opponent: "",
	winner: "",
	clicks: {
		red: 0,
		yellow: 0,
	},
	grid: [[], [], [], [], [], [], [], []]
}

function createRemoteAndLocalGrid() {
	let grid = document.getElementById("grid");
	game.grid[0] = [];
	for (let i = 1; i <= COLUMNS_NO; ++i) {
		game.grid[i] = [];
		let column = document.createElement("div");
		column.id = i;
		column.classList.add("col");
		column.setAttribute("onclick", "userMove(this)");
		for (let j = 1; j <= LINES_NO; ++j) {
			let cell = document.createElement("div");
			cell.setAttribute("class", "cell borderRadius");
			column.appendChild(cell);
		}
		grid.appendChild(column);
	}
}

function checkWinner(color) {
	for (let i = LINES_NO; i >= 1; --i) {
		for (let j = 1; j <= COLUMNS_NO; ++j) {
			let lines = 0, columns = 0, mainDiag = 0, secDiag = 0;
			for (let l = 0; l < NO_DIR; ++l) {
				if (j + l <= COLUMNS_NO && game.grid[i][j + l] == color) {
					++lines;
				}
				if (i - l >= 1 && game.grid[i - l][j] == color) {
					++columns;
				}
				if (i - l >= 1 && j + l <= COLUMNS_NO && game.grid[i - l][j + l] == color) {
					++mainDiag;
				}
				if (i - l >= 1 && j - l >= 1 && game.grid[i - l][j - l] == color) {
					++secDiag;
				}
			}
			if (lines == NO_DIR || columns == NO_DIR || mainDiag == NO_DIR || secDiag == NO_DIR) {
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

function userChoice(color, opponent) {
	if (game.clicks[color] === 0 && !game.winner) {
		game.pen = color;
		game.opponent = opponent;
		setMessage("you chosen " + game.pen, color);
	} else if (!game.winner) {
		setMessage("don't try on cheating !", color);
	}
}

function userMove(element) {
	if (game.pen && !game.winner) {
		if (game.clicks[game.pen] === 0) {
			id = parseInt(element.id);
			++game.columns[id];
			let cell = element.children[LINES_NO - game.columns[id]];
			cell.style.backgroundColor = game.pen;
			game.grid[COLUMNS_NO - game.columns[id]][id] = game.pen;
			++game.clicks[game.pen];
			game.clicks[game.opponent] = 0;
			game.winner = checkWinner(game.pen);
			if (game.winner) {
				alert(`Congratulations !!! the player using ${game.pen} has won !!!`);
				setMessage(`Congratulations !!! the player using ${game.pen} has won !!!`, game.pen);
			}
		} else {
			setMessage("change color !!", "black");
		}
	} else if (!game.pen && !game.winner) {
		setMessage("choose a color first !!!", "black");
	}
}
