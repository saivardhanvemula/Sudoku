function is_valid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == num || board[i][col] == num) return false;
    }
    let srow = Math.floor(row / 3) * 3;
    let scol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[srow + i][scol + j] == num) return false;
        }
    }
    return true;
}
function find_empty(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                return [i, j];
            }
        }
    }
    return false;
}
function solve(board) {
    let empty = find_empty(board);
    if (!empty) {
        return true;
    }
    let [a, b] = empty;
    for (let i = 1; i < 10; i++) {
        if (is_valid(board, a, b, i)) {
            board[a][b] = i;
            if (solve(board)) {
                return true;
            }
            board[a][b] = 0;
        }
    }
    return false;
}
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sudoku_board = Array(9)
    .fill(0)
    .map((x) => Array(9).fill(0));
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let a = nums[Math.floor(Math.random() * nums.length)];
        sudoku_board[3 * i][3 * j] = a;
        nums.splice(nums.indexOf(a), 1);
    }
}
console.log(sudoku_board);
if (solve(sudoku_board)) {
    for (let i = 0; i < 9; i++) {
        console.log(sudoku_board[i]);
    }
} else {
    console.log("No solution found");
}
