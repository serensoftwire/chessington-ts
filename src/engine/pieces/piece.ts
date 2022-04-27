import Board from "../board";
import Square from "../square";
import Player from "../player";
import GameSettings from "../gameSettings";

export default class Piece {

    constructor(public readonly player: Player) {
        this.player = player;
    }

    getCurrentRow(board: Board) {
        return board.findPiece(this).row;
    }

    getCurrentCol(board: Board) {
        return board.findPiece(this).col;
    }

    protected static generateLateralMoves = (currentRow: number, currentCol: number) => {
        const moves: Square[] = [];

        for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
            if (row != currentRow) {
                moves.push(Square.at(row, currentCol));
            }
        }

        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col != currentCol) {
                moves.push(Square.at(currentRow, col));
            }
        }

        return moves;
    }

    protected static generateDownDiagonalMoves = (currentRow: number, currentCol: number) => {
        const downDiagonalMoves: Square[] = [];
        const invStart: number = currentRow + currentCol;

        for (let row: number = invStart; row >= 0; row--) {
            if (row != currentRow) {
                downDiagonalMoves.push(Square.at(row, invStart - row));
            }
        }

        return downDiagonalMoves;
    }

    protected static createUpDiagonalMove = (zeroStart: number, higherCoordinate: number, higherIsCol: boolean) => {
        return higherIsCol ? Square.at(zeroStart, higherCoordinate) : Square.at(higherCoordinate, zeroStart);
    }

    protected static getUpDiagonalMoves = (intercept: number, currentHigher: number, higherIsCol: boolean) => {
        const upDiagonalMoves: Square[] = [];
        let zeroStart: number = 0;

        for (let higherCoordinate: number = intercept; higherCoordinate < GameSettings.BOARD_SIZE; higherCoordinate++) {
            if (higherCoordinate != currentHigher) {
                upDiagonalMoves.push(Piece.createUpDiagonalMove(zeroStart, higherCoordinate, higherIsCol));
            }
            zeroStart++;
        }

        return upDiagonalMoves;
    }

    protected static generateUpDiagonalMoves = (currentRow: number, currentCol: number) => {
        const higherCoordinate: number = Math.max(currentCol, currentRow);
        const intercept: number = higherCoordinate - Math.min(currentRow, currentCol);
        const higherIsCol: boolean = currentCol > currentRow

        return Piece.getUpDiagonalMoves(intercept, higherCoordinate, higherIsCol);
    }

    protected static removeBlockedMoves(moves: Square[], board: Board): Square[] {
        return moves.filter(square => square.isEmpty(board));
    }

    getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
