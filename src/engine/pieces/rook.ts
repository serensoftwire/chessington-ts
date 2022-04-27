import Piece from './piece';
import Board from "../board";
import Player from "../player";
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
            if (row != currentRow) {
                moves.push(Square.at(row, currentCol));
            }
        }

        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col != currentCol) {
                moves.push(Square.at(currentRow, col));
            }
        }

        return moves;
    }
}
