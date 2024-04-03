import Piece from './piece.mjs';

export default class Board {
    board = new Array(8).fill(null).map(() => new Array(8).fill(null));

    Board() {
        createPieces();
    }

    createPieces() {
    }
}