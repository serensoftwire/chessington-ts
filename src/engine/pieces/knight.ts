import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Knight extends Piece {
    static possibleJumps = [-1, -2, 1, 2];

    constructor(player: Player) {
        super(player);
    }

    static indexesLShapedJump(rowIndex: number, colIndex: number) {
        return (rowIndex + colIndex) % 2;
    }

    private generateMoves(board: Board) {
        const moves: Square[] = [];
        const currentSquare = this.getCurrentSquare(board);

        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            for (let colIndex = 0; colIndex < 4; colIndex++) {
                if (Knight.indexesLShapedJump(rowIndex, colIndex)) {
                    moves.push(Square.at(currentSquare.row + Knight.possibleJumps[rowIndex], currentSquare.col + Knight.possibleJumps[colIndex]));
                }
            }
        }

        return moves.filter((square) => square.isWithinBounds);
    }

    getAvailableMoves(board: Board) {
        return this.generateMoves(board);
    }
}
