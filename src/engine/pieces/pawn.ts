import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        if (this.player === Player.WHITE) {
            moves.push(Square.at(currentRow+1,currentCol));
            if (currentRow === 1) {
                moves.push(Square.at(currentRow+2, currentCol));
            }
        } else {
            moves.push(Square.at(currentRow-1,currentCol));
            if (currentRow === 6) {
                moves.push(Square.at(currentRow-2, currentCol));
            }
        }
        return moves;
    }
}
