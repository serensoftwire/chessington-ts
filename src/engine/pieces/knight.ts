import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Knight extends Piece {
    static possibleJumps = [-1, -2, 1, 2];

    constructor(player: Player) {
        super(player);
    }

    static indexesLShapedJump(rowIndex: number, colIndex: number) {
        return (rowIndex + colIndex) % 2;
    }

    private static isValidMove(rowIndex: number, colIndex: number) {
        return this.indexesLShapedJump(rowIndex, colIndex) && rowIndex < GameSettings.BOARD_SIZE && colIndex < GameSettings.BOARD_SIZE;
    }


    private static generateMoves(currentRow: number, currentCol: number) {
        const moves: Square[] = [];

        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            for (let colIndex = 0; colIndex < 4; colIndex++) {
                if (Knight.isValidMove(rowIndex, colIndex)) {
                    moves.push(Square.at(currentRow + Knight.possibleJumps[rowIndex], currentCol + Knight.possibleJumps[colIndex]));
                }
            }
        }

        return moves;
    }

    getAvailableMoves(board: Board) {
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        return Knight.generateMoves(currentRow, currentCol);
    }
}
