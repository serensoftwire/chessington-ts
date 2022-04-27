import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Bishop extends Piece {
    constructor(player: Player) {
        super(player);
    }

    private static generateDownDiagonalMoves = (currentCol: number, currentRow: number) => {
        const downDiagonalMoves: Square[] = [];
        const invStart: number = currentRow + currentCol;

        for (let row: number = invStart; row >= 0; row--) {
            if (row != currentRow) {
                downDiagonalMoves.push(Square.at(row, invStart - row));
            }
        }

        return downDiagonalMoves;
    }

    private static createUpDiagonalMove = (zeroStart: number, higherCoordinate: number, higherIsCol: boolean) => {
        return higherIsCol ? Square.at(zeroStart, higherCoordinate) : Square.at(higherCoordinate, zeroStart);
    }

    private static getUpDiagonalMoves = (intercept: number, currentHigher: number, higherIsCol: boolean) => {
        const upDiagonalMoves: Square[] = [];
        let zeroStart: number = 0;

        for (let higherCoordinate: number = intercept; higherCoordinate < GameSettings.BOARD_SIZE; higherCoordinate++) {
            if (higherCoordinate != currentHigher) {
                upDiagonalMoves.push(Bishop.createUpDiagonalMove(zeroStart, higherCoordinate, higherIsCol));
            }
            zeroStart++;
        }

        return upDiagonalMoves;
    }

    private static generateUpDiagonalMoves = (currentCol: number, currentRow: number) => {
        const higherCoordinate: number = Math.max(currentCol, currentRow);
        const intercept: number = higherCoordinate - Math.min(currentRow, currentCol);
        const higherIsCol: boolean = currentCol > currentRow

        return Bishop.getUpDiagonalMoves(intercept, higherCoordinate, higherIsCol);
    }

    getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        moves.push(...Bishop.generateDownDiagonalMoves(currentCol, currentRow));
        moves.push(...Bishop.generateUpDiagonalMoves(currentCol, currentRow));

        return moves;
    }
}
