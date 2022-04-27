import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Bishop extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const moves = [];
        const currentRow = this.getCurrentRow(board);
        const currentCol = this.getCurrentCol(board);

        const invStart = currentRow + currentCol;
        const intercept = Math.max(currentRow, currentCol) - Math.min(currentRow, currentCol);
        let zeroStart = 0;

        for (let row = invStart; row >= 0; row--) {
            if (row != currentRow) {
                moves.push(Square.at(row, invStart - row));
            }
        }

        if (currentRow < currentCol) {
            for (let col = intercept; col < GameSettings.BOARD_SIZE; col++) {
                if (col != currentCol) {
                    moves.push(Square.at(zeroStart, col));
                }
                zeroStart++;
            }
        } else {
            for (let row = intercept; row < GameSettings.BOARD_SIZE; row++) {
                if (row != currentRow) {
                    moves.push(Square.at(row, zeroStart));
                }
                zeroStart++;
            }
        }

        return moves;
    }
}
