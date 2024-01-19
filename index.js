let selected = 0;
nums = document.querySelectorAll(".num");
nums.forEach((b) => {
    b.addEventListener("click", () => {
        // selected = Number(b.innerHTML);
        selected = b;
        selected.classList.add("select");

        nums.forEach((a) => {
            if (a !== selected) {
                a.classList.remove("select");
            }
        });
    });
});
document.querySelectorAll(".box").forEach((b) => {
    b.addEventListener("click", () => {
        if (selected && !b.classList.contains("fixed")) {
            b.innerHTML = selected.innerHTML;
            
        }
        // if()
    });
});
function display_board(board) {
    // for (let i = 0; i < 9; i++) {
    //     let srow = 0;
    //     let scol = 0;
    //     for (let j = 0; j < 3; j++) {
    //         for (let k = 0; k < 3; k++) {
                
    //         }
    //     }
    // }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // console.log(i,j)
            if(!board[i][j]==0){
                document.querySelector(`#r${i+1}${j+1}`).innerHTML=board[i][j]
                document.querySelector(`#r${i+1}${j+1}`).classList.add("fixed")
            }
            else{
                document.querySelector(`#r${i+1}${j+1}`).innerHTML=" ";
            }
            // let b=$`.s{i}>#{j}`

        }
    }
}

//random sudoku generator
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
function remove_some(board) {
    // console.log(board)
    for (let i = 0; i < Math.floor(Math.random() * 15) + 35; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (board[row][col] === 0);

        board[row][col] = 0;
    }
    return board
    // console.log(board)
}
document.addEventListener("DOMContentLoaded", async() => {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    sudoku_board = Array(9)
        .fill(0)
        .map((x) => Array(9).fill(0));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let a = nums[Math.floor(Math.random() * nums.length)];
            sudoku_board[3 * i][3 * j] = a;
            nums.splice(nums.indexOf(a), 1);
        }
    }
    // let inital=sudoku_board;
    // console.log(inital)
    solve(sudoku_board);
    console.log(sudoku_board);
    // await console.log(sudoku_board)
    // if(solve(sudoku_board)){
    //     remove_some(sudoku_board)
    //     // console.log(sudoku_board)
    // }
    // await console.log(sudoku_board)
    // console.log(sudoku_board)
    // remove_some(sudoku_board);
    // console.log(is_valid(sudoku_board))
    display_board(removed_board);
    // console.log(sudoku_board);
});
