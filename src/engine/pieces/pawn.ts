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
        const currentSquare: Square = this.getCurrentSquare(board);

        const currentRow: number = currentSquare.row;
        const currentCol: number = currentSquare.col;

        if (this.player === Player.WHITE && Square.at(currentRow+1,currentCol).isEligible(board)) {
            moves.push(Square.at(currentRow+1,currentCol));
            if (currentRow === 1 && Square.at(currentRow+2,currentCol).isEligible(board)) {
                moves.push(Square.at(currentRow+2, currentCol));
            }
        } else if (this.player === Player.BLACK && Square.at(currentRow-1,currentCol).isEligible(board)) {
            moves.push(Square.at(currentRow-1,currentCol));
            if (currentRow === 6 && Square.at(currentRow-2,currentCol).isEligible(board)) {
                moves.push(Square.at(currentRow-2, currentCol));
            }
        }

        return moves;
    }
}