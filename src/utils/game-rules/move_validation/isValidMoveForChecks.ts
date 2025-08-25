import { type IChessBoardElement, ChessPieceTeam } from "../../../interfaces";
import { isKingChecked } from "../isKingChecked";

export const isValidMoveForChecks = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, fromId: string, toId: string) => {

    const isCheckAfterMove = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, fromId: string, toId: string): boolean => {
        const fromRow = parseInt(fromId.split('-')[0]);
        const fromColumn = parseInt(fromId.split('-')[1]);
        const toRow = parseInt(toId.split('-')[0]);
        const toColumn = parseInt(toId.split('-')[1]);        

        const newElements = elements.map((row: IChessBoardElement[]) => row.map((element: IChessBoardElement) => ({...element})));

        const newElement = newElements[fromRow][fromColumn].value;
        newElements[toRow][toColumn].value = newElement;
        newElements[fromRow][fromColumn].value = null;

        return isKingChecked(newElements, currentPlayer);
    };


    if (isCheckAfterMove(elements, currentPlayer, fromId, toId)) {
        alert('Невозможный ход');
        return false;
    } 

    return true;
}