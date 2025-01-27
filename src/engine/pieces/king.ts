import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class King extends Piece {
    static possibleMoves = [0, -1, 1];

    constructor(player: Player) {
        super(player);
    }

    private generateMoves(board: Board) {
        const moves: Square[] = [];
        const currentSquare = this.getCurrentSquare(board);

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                if (rowIndex + colIndex > 0) {
                    moves.push(Square.at(currentSquare.row + King.possibleMoves[rowIndex], currentSquare.col + King.possibleMoves[colIndex]));
                }
            }
        }

        return moves.filter((square) => square.isValidLocation(this.player, board));
    }

    getAvailableMoves(board: Board) {
        return this.generateMoves(board);
    }
}
