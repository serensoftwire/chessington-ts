import Piece from './piece';
import Board from "../board";
import Player from "../player";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        return Rook.generateLateralMoves(currentRow, currentCol);
    }
}
