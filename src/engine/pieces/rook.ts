import Piece from './piece';
import Board from "../board";
import Player from "../player";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        return new Array(0);
    }
}
