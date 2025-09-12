import { type IChessBoardElement, ChessPieceTeam, ChessPieceType } from "../../../interfaces";

export const isPawnToBePromoted = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, fromId: string, toId: string) => {
    const fromRow = parseInt(fromId.split('-')[0]);
    const fromColumn = parseInt(fromId.split('-')[1]);
    const toRow = parseInt(toId.split('-')[0]);

    if (elements[fromRow][fromColumn].value?.type !== ChessPieceType.PAWN) {
        return false;
    }

    if (elements[fromRow][fromColumn].value?.type === ChessPieceType.PAWN && currentPlayer === ChessPieceTeam.WHITE) {
        if (toRow === 0) {
            return true;
        }
        return false;
    }
    
    if (elements[fromRow][fromColumn].value?.type === ChessPieceType.PAWN && currentPlayer === ChessPieceTeam.BLACK) {
        if (toRow === 7) {
            return true;
        }
        return false;
    }

    return false;
}