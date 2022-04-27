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

        if (this.player === Player.WHITE && Square.at(currentRow+1,currentCol).isEmpty(board)) {
            moves.push(Square.at(currentRow+1,currentCol));
            if (currentRow === 1 && Square.at(currentRow+2,currentCol).isEmpty(board)) {
                moves.push(Square.at(currentRow+2, currentCol));
            }
        } else if (Square.at(currentRow-1,currentCol).isEmpty(board)) {
            moves.push(Square.at(currentRow-1,currentCol));
            if (currentRow === 6 && Square.at(currentRow-2,currentCol).isEmpty(board)) {
                moves.push(Square.at(currentRow-2, currentCol));
            }
        }

        return moves;
    }
}