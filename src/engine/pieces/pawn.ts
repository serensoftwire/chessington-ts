import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    private makePawnMoveChecker = (board: Board): Function => {
        const isWhite = this.player === Player.WHITE;
        const increment = isWhite ? 1 : -1;

        return (currentRow: number, currentCol: number): Square[] => {
            const moves: Square[] = [];

            const addEmptySquares = () => {
                if (Square.at(currentRow + increment, currentCol).isEmptySquare(board)) {
                    moves.push(Square.at(currentRow + increment, currentCol));
                    if (currentRow === 1 && isWhite || currentRow === 6 && !isWhite) {
                        if (Square.at(currentRow + 2 * increment, currentCol).isEmptySquare(board)) {
                            moves.push(Square.at(currentRow + 2 * increment, currentCol));
                        }
                    }
                }
            };

            const addCaptures = () => {
                for (const colDirection of [-1, 1]) {
                    if (Square.at(currentRow + increment, currentCol + colDirection).canBeCaptured(this.player, board)) {
                        moves.push(Square.at(currentRow + increment, currentCol + colDirection));
                    }
                }
            }

            addEmptySquares();
            addCaptures();

            return moves;
        }
    }

    getAvailableMoves(board: Board) {
        const currentSquare: Square = this.getCurrentSquare(board);
        const pawnMoveChecker = this.makePawnMoveChecker(board);

        return pawnMoveChecker(currentSquare.row, currentSquare.col);
    }
}