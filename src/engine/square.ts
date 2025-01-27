import GameSettings from "./gameSettings";
import Board from "./board";
import Piece from "./pieces/piece";
import King from "./pieces/king";

export default class Square {
    constructor(public row: number, public col: number) {
    }

    static at(row: number, col:number): Square {
        return new Square(row, col);
    }

    isWithinBounds(): boolean {
        return this.row < GameSettings.BOARD_SIZE && this.col < GameSettings.BOARD_SIZE && this.row >= 0 && this.col >= 0;
    }

    containsNoPiece(board: Board): boolean {
        return !(board.getPiece(this) instanceof Piece);
    }

    isEmptySquare(board: Board): boolean {
        return this.isWithinBounds() && this.containsNoPiece(board);
    }

    holdsEnemyPieceOf(colour: string, board: Board): boolean {
        const piece = board.getPiece(this);
        return piece instanceof Piece && piece.player != colour;
    }

    holdsKing(board: Board): boolean {
        return board.getPiece(this) instanceof King;
    }

    canBeCaptured(colour: string, board: Board): boolean {
        return this.isWithinBounds() && this.holdsEnemyPieceOf(colour, board) && !this.holdsKing(board);
    }

    isValidLocation(colour: string, board: Board): boolean {
        return this.isEmptySquare(board) || this.canBeCaptured(colour, board);
    }

    equals(otherSquare: Square): boolean {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    toString(): string {
        return `Row ${this.row}, Col ${this.col}`;
    }
}
