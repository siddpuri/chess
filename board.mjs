import Piece from './piece.mjs';

export default class Board {
    board = new Array(8).fill(null).map(() => new Array(8).fill(null));
    moves = [];

    Board() {
        createPieces();
    }

    createPieces() {
        for (let i = 0; i < 8; i++) {
            this.board[1][i] = new Pawn(this, 1, [1, i]);
            this.board[6][i] = new Pawn(this, -1, [6, i]);
        }
        this.board[0][0] = new Rook(this, 1, [0, 0]);
        this.board[0][7] = new Rook(this, 1, [0, 7]);
        this.board[7][0] = new Rook(this, -1, [7, 0]);
        this.board[7][7] = new Rook(this, -1, [7, 7]);
        this.board[0][1] = new Knight(this, 1, [0, 1]);
        this.board[0][6] = new Knight(this, 1, [0, 6]);
        this.board[7][1] = new Knight(this, -1, [7, 1]);
        this.board[7][6] = new Knight(this, -1, [7, 6]);
        this.board[0][2] = new Bishop(this, 1, [0, 2]);
        this.board[0][5] = new Bishop(this, 1, [0, 5]);
        this.board[7][2] = new Bishop(this, -1, [7, 2]);
        this.board[7][5] = new Bishop(this, -1, [7, 5]);
        this.board[0][3] = new Queen(this, 1, [0, 3]);
        this.board[7][3] = new Queen(this, -1, [7, 3]);
        this.board[0][4] = new King(this, 1, [0, 4]);
        this.board[7][4] = new King(this, -1, [7, 4]);
    }
}
