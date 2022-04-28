import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    private static makePawnMoveChecker = function (moveUp: boolean, board: Board): Function {
        const increment = moveUp ? 1 : -1;

        return function checkPawnMoves (currentRow: number, currentCol: number): Square[] {
            const moves: Square[] = [];

            if (Square.at(currentRow + increment,currentCol).isEligible(board)) {
                moves.push(Square.at(currentRow + increment, currentCol));
                if (currentRow === 1 && moveUp || currentRow === 6 && !moveUp) {
                    if (Square.at(currentRow + 2*increment, currentCol).isEligible(board)) {
                        moves.push(Square.at(currentRow + 2*increment, currentCol));
                    }
                }
            }

            return moves;
        }
    }

    getAvailableMoves(board: Board) {
        const currentSquare: Square = this.getCurrentSquare(board);

        const currentRow: number = currentSquare.row;
        const currentCol: number = currentSquare.col;

        const pawnMoveChecker = Pawn.makePawnMoveChecker(this.player === Player.WHITE, board);

        return pawnMoveChecker(currentRow, currentCol);
    }
}