const horizontals = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const diagonals = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const alldirs = horizontals.concat(diagonals);
const knights = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

export default class Piece {
    constructor(board, color, position) {
        this.board = board;
        this.color = color;
        this.position = position;
    }

    whatsAt(rowOffset, colOffset) {
        let row = this.position[0] + rowOffset;
        let col = this.position[1] + colOffset;
        if (row < 0 || row >= 8 || col < 0 || col >= 8) return undefined;
        return this.board[row][col];
    }

    getLongMoves(dirs) {
        let moves = [];
        for (let dir of dirs) {
            let [r, c] = dir;
            for (let target = null; target === null; r += dir[0], c += dir[1]) {
                target = whatsAt(r, c);
                if (target === null || (target && target.color !== this.color)) {
                    moves.push([r, c]);
                }
            }
        }
        return moves;
    }
}

export class Pawn extends Piece {
    constructor(board, color, position) { super(board, color, position); }

    getValue() { return 1; }
    getSymbol() { return "♟"; }

    getMoves() {
        let moves = [];
        if (whatsAt(this.color, 0) === null) {
            moves.push([this.color, 0]);
            if (this.isInStartingRow() && whatsAt(this.color * 2, 0) === null) {
                moves.push([this.color * 2, 0]);
            }
        }
        for (let colOffset = -1; colOffset <= 1; colOffset += 2) {
            let target = whatsAt(this.color, colOffset);
            if (target && target.color !== this.color) {
                moves.push([this.color, colOffset]);
            }
        }
        // TODO: en passant
        return moves;
    }

    isInStartingRow() {
        return this.position[0] === (this.color === 1? 1 : 6);
    }
}

export class Rook extends Piece {
    constructor(board, color, position) { super(board, color, position); }

    getValue() { return 5; }
    getSymbol() { return "♜"; }
    getMoves() { return getLongMoves(horizontals); }
}

export class Knight extends Piece {
    constructor(board, color, position) { super(board, color, position); }

    getValue() { return 3; }
    getSymbol() { return "♞"; }

    getMoves() {
        let moves = [];
        for (let offset of knights) {
            let target = whatsAt(offset[0], offset[1]);
            if (target === null || (target && target.color !== this.color)) {
                moves.push(offset);
            }
        }
        return moves;
    }
}

export class Bishop extends Piece {
    constructor(board, color, position) { super(board, color, position); }

    getValue() { return 3; }
    getSymbol() { return "♝"; }
    getMoves() { return getLongMoves(diagonals); }
}

export class Queen extends Piece {
    constructor(board, color, position) {
        super(board, color, position);
    }

    getValue() { return 9; }
    getSymbol() { return "♛"; }
    getMoves() { return getLongMoves(alldirs); }
}

export class King extends Piece {
    constructor(board, color, position) { super(board, color, position); }

    getValue() { return 1000; }
    getSymbol() { return "♚"; }

    getMoves() {
        let moves = [];
        for (let offset of alldirs) {
            let target = whatsAt(offset[0], offset[1]);
            if (target === null || (target && target.color !== this.color)) {
                moves.push(offset);
            }
        }
        // TODO: castling
        return moves;
    }
}
