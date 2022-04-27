import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        moves.push(...Queen.generateLateralMoves(currentRow, currentCol, board));
        moves.push(...Queen.generateUpDiagonalMoves(currentRow, currentCol));
        moves.push(...Queen.generateDownDiagonalMoves(currentRow, currentCol));

        return moves;
    }
}
