import Board from "../board";
import Square from "../square";
import Player from "../player";

export default class Piece {

    constructor(public readonly player: Player) {
        this.player = player;
    }

    getCurrentRow(board: Board) {
        return board.findPiece(this).row;
    }

    getCurrentCol(board: Board) {
        return board.findPiece(this).col;
    }

    getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
