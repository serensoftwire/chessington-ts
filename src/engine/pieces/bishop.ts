import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves = (board: Board) => {
        const moves: Square[] = [];
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        moves.push(...Bishop.generateDownDiagonalMoves(currentRow, currentCol));
        moves.push(...Bishop.generateUpDiagonalMoves(currentRow, currentCol));

        return moves;
    }
}
