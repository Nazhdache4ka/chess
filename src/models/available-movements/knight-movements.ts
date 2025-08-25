import { ChessPieceType } from "../../interfaces";

export const knightMovements = {
    [ChessPieceType.KNIGHT]: [
        {row: 2, column: 1},
        {row: 2, column: -1},
        {row: -2, column: 1},
        {row: -2, column: -1},
        {row: 1, column: 2},
        {row: 1, column: -2},
        {row: -1, column: 2},
        {row: -1, column: -2},
    ]
}