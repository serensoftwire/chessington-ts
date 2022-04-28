import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const currentSquare = this.getCurrentSquare(board);

        moves.push(...Queen.generateLateralMoves(currentSquare, board));
        moves.push(...Queen.generateDiagonalMoves(currentSquare, board));

        return moves;
    }
}
