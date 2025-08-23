import { ChessPieceType, ChessPieceTeam, type IChessBoardElement } from "../interfaces";


export const fillChessBoard = (elements: IChessBoardElement[][]) => {
    const newElements = [...elements];

    newElements.forEach((row, indexRow) => {
        row.forEach((element: IChessBoardElement, indexColumn: number) => {
            if (indexRow === 0 || indexRow === 1) {
                element.value = {
                    type: indexRow === 1 ? 
                    ChessPieceType.PAWN : indexColumn === 0 || indexColumn === 7 ? 
                    ChessPieceType.ROOK : indexColumn === 1 || indexColumn === 6 ? 
                    ChessPieceType.KNIGHT : indexColumn === 2 || indexColumn === 5 ? 
                    ChessPieceType.BISHOP : indexColumn === 3 ? 
                    ChessPieceType.QUEEN : ChessPieceType.KING,
                    team: ChessPieceTeam.BLACK,
                };
            }
            if (indexRow === 6 || indexRow === 7) {
                element.value = {
                    type: indexRow === 6 ? 
                    ChessPieceType.PAWN : indexColumn === 0 || indexColumn === 7 ? 
                    ChessPieceType.ROOK : indexColumn === 1 || indexColumn === 6 ? 
                    ChessPieceType.KNIGHT : indexColumn === 2 || indexColumn === 5 ? 
                    ChessPieceType.BISHOP : indexColumn === 3 ? 
                    ChessPieceType.QUEEN : ChessPieceType.KING,
                    team: ChessPieceTeam.WHITE,
                };
            }
        });
    });

    return newElements;
}