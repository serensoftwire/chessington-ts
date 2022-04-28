import Piece from './piece';
import Board from "../board";
import Player from "../player";

export default class Queen extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const currentSquare = this.getCurrentSquare(board);
        const moveset: number[][] = [[1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1]];

        return Queen.checkLongRangeMoves(currentSquare, board, moveset);
    }
}
