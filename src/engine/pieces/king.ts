import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class King extends Piece {
    static possibleMoves = [0, -1, 1];

    constructor(player: Player) {
        super(player);
    }

    private static generateMoves(currentRow: number, currentCol: number) {
        const moves: Square[] = [];

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                if (rowIndex + colIndex > 0) {
                    moves.push(Square.at(currentRow + this.possibleMoves[rowIndex], currentCol + this.possibleMoves[colIndex]));
                }
            }
        }

        return moves.filter((square) => square.exists);
    }

    getAvailableMoves(board: Board) {
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        return King.generateMoves(currentRow, currentCol);
    }
}
