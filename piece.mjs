export default class Piece {
    board;
    color;
    position;

    constructor(board, color, position) {
        this.board = board;
        this.color = color;
        this.position = position;
    }

    whatsAt(rowOffset, colOffset) {
        let row = this.position[0] + rowOffset;
        let col = this.position[1] + colOffset;
        if (row < 0 || row >= 8 || col < 0 || col >= 8) {
            return undefined;
        }
        return this.board[row][col];
    }
}

export class Pawn extends Piece {
    constructor(board, color, position) {
        super(board, color, position);
    }

    getValue() { return 1; }

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
    }

    isInStartingRow() {
        return this.color === 1 ? this.position[0] === 1 : this.position[0] === 6;
    }
}
