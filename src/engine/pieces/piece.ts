import Board from "../board";
import Square from "../square";
import Player from "../player";
import GameSettings from "../gameSettings";

export default abstract class Piece {

    protected constructor(public readonly player: Player) {
        this.player = player;
    }

    getCurrentSquare(board: Board): Square {
        return board.findPiece(this);
    }

    private static isWithinBounds(row: number, col: number): boolean {
        return (row >= 0 && row < GameSettings.BOARD_SIZE && col >= 0 && col < GameSettings.BOARD_SIZE);
    }

    private static longRangeMoveChecker = function(rowDirection: number, colDirection: number, board: Board): Function {

        return function recurseMove (row: number, col: number, squares: Square[]): Square[] {

            if (Piece.isWithinBounds(row, col) && Square.at(row, col).isEmpty(board)) {
                squares.push(Square.at(row, col));
                return recurseMove(row + rowDirection, col + colDirection, squares);
            }

            return squares;
        }
    }

    protected static checkLongRangeMoves = function(currentSquare: Square, board: Board, moveset: number[][]): Square[] {
        const moves: Square[] = [];

        for (let [rowDirection, colDirection] of moveset) {
            const moveChecker = Piece.longRangeMoveChecker(rowDirection, colDirection, board);
            moveChecker(currentSquare.row + rowDirection, currentSquare.col + colDirection, moves);
        }

        return moves;
    }

    abstract getAvailableMoves(board: Board): Square[];

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
