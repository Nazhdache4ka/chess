import { type IChessBoardElement, ChessPieceTeam, ChessPieceType } from "../../../interfaces";
import { getIdCoordinates } from "../../../utils/getIdCoordinates";

export const isPawnToBePromoted = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, fromId: string, toId: string) => {
    const fromCoordinates = getIdCoordinates(fromId);
    const toCoordinates = getIdCoordinates(toId);

    const elementToBePromoted = elements[fromCoordinates.row][fromCoordinates.column].value?.type;

    if (elementToBePromoted !== ChessPieceType.PAWN) {
        return false;
    }

    if (elementToBePromoted === ChessPieceType.PAWN && currentPlayer === ChessPieceTeam.WHITE) {
        if (toCoordinates.row === 0) {
            return true;
        }
        return false;
    }
    
    if (elementToBePromoted === ChessPieceType.PAWN && currentPlayer === ChessPieceTeam.BLACK) {
        if (toCoordinates.row === 7) {
            return true;
        }
        return false;
    }

    return false;
}