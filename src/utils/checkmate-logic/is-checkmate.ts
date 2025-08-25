import { type IChessBoardElement, ChessPieceTeam } from "../../interfaces";
import { isKingChecked } from "../game-rules/isKingChecked";
import { getPossibleMoves } from "./get-possible-moves";

export const isCheckmate = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, isCheck: boolean) => {
    if (!isCheck) {
        return false;
    }

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const element = elements[row][column];

            if (element.value?.team === currentPlayer) {
                const possibleMoves = getPossibleMoves(elements, row, column, currentPlayer, element);

                if (possibleMoves.length > 0) {
                    for (const move of possibleMoves) {
                        const newElements = elements.map(row => row.map(element => ({...element})));
                        newElements[row][column].value = null;
                        newElements[move.row][move.column].value = element.value;

                        if (!isKingChecked(newElements, currentPlayer)) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    return true;
}