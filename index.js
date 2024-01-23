document.addEventListener("DOMContentLoaded", () => {
    start();
    // let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // sudoku_board = Array(9)
    //     .fill(0)
    //     .map((x) => Array(9).fill(0));
    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         let a = nums[Math.floor(Math.random() * nums.length)];
    //         sudoku_board[3 * i][3 * j] = a;
    //         nums.splice(nums.indexOf(a), 1);
    //     }
    // }
    // solve(sudoku_board);
    // remove_some(sudoku_board);
    // // let removed=
    // // console.log(removed)
    // display_board(sudoku_board);
});
let empty = 1;
let remove = false;
let selected;
nums = document.querySelectorAll(".num");
nums.forEach((b) => {
    b.addEventListener("click", () => {
        if(selected || remove)document.querySelector(".select").classList.remove("select")
        selected = b;
        selected.classList.add("select");
    });
});
document.querySelector(".validate").addEventListener("click", () => {
    if (isValidSudoku(sudoku_board)) {
        document.querySelector(".validate").classList.toggle("valid");
        setTimeout(function () {
            console.log("removing");
            document.querySelector(".valid").classList.remove("valid")
        }, 1500);
    } else {
        document.querySelector(".validate").classList.add("invalid");
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let box = document.querySelector(`#r${i + 1}${j + 1}`);
                let num = sudoku_board[i][j];
                // sudoku_board[i][j] = 0;
                if (
                    !box.classList.contains("fixed") &&
                    !is_valid(sudoku_board, i, j, num) &&
                    box.innerHTML != 0
                ) {
                    console.log(is_valid(sudoku_board, i, j, num));
                    console.log(`r${i + 1}${j + 1}`);
                    box.classList.add("invalid");
                }
            }
        }
        setTimeout(function () {
            console.log("removing");
            document.querySelectorAll(".invalid").forEach((b) => {
                console.log(b);
                b.classList.remove("invalid");
            });
        }, 2000);
    }
});
document.querySelector(".reset").addEventListener("click", () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            box = document.querySelector(`#r${i + 1}${j + 1}`);
            if (!box.classList.contains("fixed") && sudoku_board[i][j] != 0) {
                empty = empty + 1;
                // console.log(box)
                box.innerHTML = " ";
                sudoku_board[i][j] = 0;
            }
        }
    }
});
document.querySelector(".remove").addEventListener("click", () => {
    if(selected || remove)document.querySelector(".select").classList.remove("select")
    remove = !remove;
    document.querySelector(".remove").classList.toggle("select");
    console.log(remove);

});
document.querySelectorAll(".box").forEach((b) => {
    b.addEventListener("dblclick", () => {
        if (remove && !b.classList.contains("fixed")) {
            let x = b.id[1];
            let y = b.id[2];
            sudoku_board[x-1][y-1]=0
            b.innerHTML=" ";
            empty=empty+1
        }
    });
    b.addEventListener("click", () => {
        if (selected && !b.classList.contains("fixed")) {
            let x = b.id[1];
            let y = b.id[2];
            if (!sudoku_board[x - 1][y - 1]) {
                empty = empty - 1;
            }

            sudoku_board[x - 1][y - 1] = Number(selected.innerHTML);
            b.innerHTML = selected.innerHTML;
            // console.log(x,y)
        }
        console.log(empty);
        if (empty == 0) {
            console.log("completed");
        }
    });
});
function start() {
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
    solve(sudoku_board);
    remove_some(sudoku_board);
    display_board(sudoku_board);
}
function display_board(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // console.log(i,j)
            if (!board[i][j] == 0) {
                document.querySelector(`#r${i + 1}${j + 1}`).innerHTML =
                    board[i][j];
                document
                    .querySelector(`#r${i + 1}${j + 1}`)
                    .classList.add("fixed");
            } else {
                document.querySelector(`#r${i + 1}${j + 1}`).innerHTML = " ";
                empty = empty + 1;
            }
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
    //  const removed=[].board
    // console.log(board)
}
function check(list) {
    d = [];
    // console.log(list,d)
    for (let num of list) {
        if (num != "0" && d.includes(num)) {
            // console.log(list[i],d,list[i] in d)
            return false;
        } else {
            d.push(num);
        }
    }
    return true;
}
var isValidSudoku = function (board) {
    for (let i = 0; i < 9; i++) {
        if (!check(board[i])) return false;
        l = [];
        for (let j = 0; j < 9; j++) {
            if (board[j][i] != "0") {
                if (l.includes(board[j][i])) {
                    // console.log(board[j][i], j, i, l);
                    return false;
                } else {
                    l.push(board[j][i]);
                }
            }
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let box = [];
            for (let m = i; m < i + 3; m++) {
                for (let n = j; n < j + 3; n++) {
                    box.push(board[m][n]);
                }
            }
            if (!check(box)) {
                return false;
            }
        }
    }
    return true;
};
