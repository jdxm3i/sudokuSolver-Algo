function isPossible(sudoku, i, j, no, n) {
    for (let x = 0; x < n; x++) {
        if (sudoku[x][j] === no || sudoku[i][x] === no) {
            return false;
        }
    }

    const sx = Math.floor(i / 3) * 3;
    const sy = Math.floor(j / 3) * 3;

    for (let x = sx; x < sx + 3; x++) {
        for (let y = sy; y < sy + 3; y++) {
            if (sudoku[x][y] === no) {
                return false;
            }
        }
    }

    return true;
}

function printSudoku(sudoku, startingSudoku, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (startingSudoku[i][j] !== sudoku[i][j]) {
                process.stdout.write('\x1b[93m' + sudoku[i][j] + '\x1b[0m ');
            } else {
                process.stdout.write(sudoku[i][j] + ' ');
            }
            if ((j + 1) % 3 === 0) {
                process.stdout.write('\t');
            }
        }
        if ((i + 1) % 3 === 0) {
            console.log();
        }
        console.log();
    }
}

function solveSudoku(sudoku, startingSudoku, i, j) {
    if (i === 9) {
        printSudoku(sudoku, startingSudoku, 9);
        return true;
    }

    if (j === 9) {
        return solveSudoku(sudoku, startingSudoku, i + 1, 0);
    }

    if (sudoku[i][j] !== 0) {
        return solveSudoku(sudoku, startingSudoku, i, j + 1);
    }

    for (let no = 1; no <= 9; no++) {
        if (isPossible(sudoku, i, j, no, 9)) {
            sudoku[i][j] = no;
            const solutionFound = solveSudoku(sudoku, startingSudoku, i, j + 1);
            if (solutionFound) {
                return true;
            }
        }
    }
    sudoku[i][j] = 0;
    return false;
}

const initialSudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log("Original Sudoku:");
printSudoku(initialSudoku, initialSudoku, 9);
console.log("\nSolution:");
const solvedSudoku = JSON.parse(JSON.stringify(initialSudoku)); 
solveSudoku(solvedSudoku, initialSudoku, 0, 0);
