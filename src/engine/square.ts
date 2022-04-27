import GameSettings from "./gameSettings";
import Board from "./board";
import Piece from "./pieces/piece";

export default class Square {
    constructor(public row: number, public col: number) {
    }

    static at(row: number, col:number): Square {
        return new Square(row, col);
    }

    exists(): boolean {
        return this.row < GameSettings.BOARD_SIZE && this.col < GameSettings.BOARD_SIZE;
    }

    isEmpty(board: Board): boolean {
        return !(board.getPiece(this) instanceof Piece);
    }

    equals(otherSquare: Square): boolean {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    toString(): string {
        return `Row ${this.row}, Col ${this.col}`;
    }
}
