import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    private static makePawnMoveChecker = function (isWhite: boolean, board: Board): Function {
        const increment = isWhite ? 1 : -1;

        return function checkPawnMoves (currentRow: number, currentCol: number): Square[] {
            const moves: Square[] = [];

            if (Square.at(currentRow + increment,currentCol).isUnoccupied(board)) {
                moves.push(Square.at(currentRow + increment, currentCol));
                if (currentRow === 1 && isWhite || currentRow === 6 && !isWhite) {
                    if (Square.at(currentRow + 2*increment, currentCol).isUnoccupied(board)) {
                        moves.push(Square.at(currentRow + 2*increment, currentCol));
                    }
                }
            }

            return moves;
        }
    }

    getAvailableMoves(board: Board) {
        const currentSquare: Square = this.getCurrentSquare(board);
        const pawnMoveChecker = Pawn.makePawnMoveChecker(this.player === Player.WHITE, board);

        return pawnMoveChecker(currentSquare.row, currentSquare.col);
    }
}