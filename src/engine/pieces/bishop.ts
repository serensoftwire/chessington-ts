import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player: Player) {
        super(player);
    }

    private static removeBlockedMoves(board: Board, moves: Square[], upDirectionLength: number): Square[] {
        let legalMoves: Square[] = moves;

        for (let downIndex: number = upDirectionLength; downIndex < moves.length; downIndex++) {
            if (legalMoves[downIndex] === undefined) {
                break;
            }

            if (!legalMoves[downIndex].isEmpty(board)) {
                legalMoves = legalMoves.slice(0, downIndex);
                break;
            }
        }

        for (let upIndex: number = upDirectionLength - 1; upIndex >= 0; upIndex--) {
            try {
                if (!legalMoves[upIndex].isEmpty(board)) {
                    legalMoves = legalMoves.slice(upIndex + 1, -1);
                    break;
                }
            } catch (err) {
                console.log(err);
            }
        }

        return legalMoves;
    }

    getAvailableMoves = (board: Board) => {
        const moves: Square[] = [];
        const currentRow: number = this.getCurrentRow(board);
        const currentCol: number = this.getCurrentCol(board);

        moves.push(...Bishop.generateDownDiagonalMoves(currentRow, currentCol));

        const upDirectionLength = moves.length;
        console.log(upDirectionLength);

        moves.push(...Bishop.generateUpDiagonalMoves(currentRow, currentCol));

        return Bishop.removeBlockedMoves(board, moves, upDirectionLength);
    }
}
