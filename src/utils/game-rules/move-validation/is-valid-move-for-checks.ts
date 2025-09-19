import { type IChessBoardElement, ChessPieceTeam } from "../../../interfaces";
import { isKingChecked } from "../is-king-checked";
import { getIdCoordinates } from "../../../utils/getIdCoordinates";

export const isValidMoveForChecks = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, fromId: string, toId: string) => {

    const isCheckAfterMove = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, fromId: string, toId: string): boolean => {
        const fromCoordinates = getIdCoordinates(fromId);
        const toCoordinates = getIdCoordinates(toId);        

        const newElements = elements.map((row: IChessBoardElement[]) => row.map((element: IChessBoardElement) => ({...element})));

        const newElement = newElements[fromCoordinates.row][fromCoordinates.column].value;
        newElements[toCoordinates.row][toCoordinates.column].value = newElement;
        newElements[fromCoordinates.row][fromCoordinates.column].value = null;

        return isKingChecked(newElements, currentPlayer);
    };


    if (isCheckAfterMove(elements, currentPlayer, fromId, toId)) {
        alert('Невозможный ход');
        return false;
    } 

    return true;
}