const LINES_NO = 6;
const COLUMNS_NO = 7;
const FOUR = 4;
const THREE = 3;
const TWO = 2;
const ONE = 1;

let game = {
	columns: [0, 0, 0, 0, 0, 0, 0, 0],
	pen: "",
	oponent: "",
	winner: "",
	clicks: {
		red: 0,
		yellow: 0,
	},
	grid: [[], [], [], [], [], [], [], []]
}

function checkWinner2(color) {
	for (let i = 1; i <= COLUMNS_NO; ++i) {
		for (let j = 1; j <= FOUR; ++j) {
			if ((i <= LINES_NO &&//checking lines and columns
				 game.grid[i][j] == color && game.grid[i][j + 1] == color &&
				 game.grid[i][j + TWO] == color && game.grid[i][j + THREE] == color) ||
				(j <= THREE &&
				 game.grid[j][i] == color && game.grid[j + 1][i] == color &&
				 game.grid[j + TWO][i] == color && game.grid[j + THREE][i] == color)) {
				return true;
			}//checking paralels above main diagonal
			if ((i <= FOUR && j <= THREE &&
				 game.grid[j][j + i - 1] == color &&
				 game.grid[j + 1][j + 1 + i - 1] == color &&
				 game.grid[j + TWO][j + TWO + i - 1] == color &&
				 game.grid[j + THREE][j + THREE + i - 1] == color) ||
				(i <= TWO && j <= TWO &&//checking paralels bellow main diagonal
				 game.grid[j + i][j] == color &&
				 game.grid[j + i + 1][j + 1] == color &&
				 game.grid[j + i + TWO][j + TWO] == color &&
				 game.grid[j + i + THREE][j + THREE] == color)) {
				return true;
			}//checking paralels above second diagonal
			if ((i <= FOUR && j <= THREE &&
				 game.grid[j][(COLUMNS_NO - j + 1) - i + 1] == color &&
				 game.grid[j + 1][(COLUMNS_NO - j + 1) - i + 1 - 1] == color &&
				 game.grid[j + TWO][(COLUMNS_NO - j + 1) - i + 1 - 2] == color &&
				 game.grid[j + THREE][(COLUMNS_NO - j + 1) - i + 1 - THREE] == color) ||
				(i <= TWO && j <= TWO &&//checking paralels bellow second diagonal
				 game.grid[j + i][(COLUMNS_NO - j + 1)] == color &&
				 game.grid[j + i + 1][(COLUMNS_NO - j + 1) - 1] == color &&
				 game.grid[j + i + TWO][(COLUMNS_NO - j + 1) - TWO] == color &&
				 game.grid[j + i + THREE][(COLUMNS_NO - j + 1) - THREE] == color)) {
				return true;
			}
		}
	}
	return false;
}

function createRemoteAndLocalGrid() {
	let grid = document.getElementById("grid");
	game.grid[0] = [];
	for (let i = 1; i <= COLUMNS_NO; ++i) {
		game.grid[i] = [];
		let column = document.createElement("div");
		column.setAttribute("id", i);
		column.setAttribute("class", "col");
		column.setAttribute("onclick", "userMove(this)");
		for (let j = 0; j < LINES_NO; ++j) {
			let cell = document.createElement("div");
			cell.setAttribute("class", "cell borderRadius");
			column.appendChild(cell);
		}
		grid.appendChild(column);
	}
}

function setMessage(message, color) {
	element = document.getElementById("message");
	element.children[0].innerText = message;
	element.children[0].style.color = color;
}

function userChoice(color, oponent) {
	if (game.clicks[color] === 0 && !game.winner) {
		game.pen = color;
		game.oponent = oponent;
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
			game.clicks[game.oponent] = 0;
			game.winner = checkWinner2(game.pen);
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
