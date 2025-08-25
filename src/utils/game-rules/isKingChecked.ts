import { type IChessBoardElement, ChessPieceTeam, ChessPieceType } from "../../interfaces";
import { canPieceAttackKing } from "./canPieceAttackKing";

export const isKingChecked = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam): boolean => {
    let kingRow = -1;
    let kingColumn = -1;

    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < elements[i].length; j++) {
            if (elements[i][j].value?.team === currentPlayer && elements[i][j].value?.type === ChessPieceType.KING) {
                kingRow = i;
                kingColumn = j;
                break;
            }
        }
    }

    if (kingRow === -1 || kingColumn === -1) {
        return false;
    }
    
    for (let rowIndex = 0; rowIndex < elements.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < elements[rowIndex].length; columnIndex++) {

            const element = elements[rowIndex][columnIndex];

            if (canPieceAttackKing(elements, element, kingRow, kingColumn, rowIndex, columnIndex) && element.value?.team !== currentPlayer) {
                return true;
            }
        }
    }

    return false;
}