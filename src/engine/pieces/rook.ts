import Piece from './piece';
import Board from "../board";
import Player from "../player";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const currentSquare = this.getCurrentSquare(board);
        const moveset: number[][] = [[1, 0], [-1, 0], [0, -1], [0, 1]];

        return Rook.checkLongRangeMoves(currentSquare, board, moveset);
    }
}
