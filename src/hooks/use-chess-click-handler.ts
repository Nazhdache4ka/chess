import { type IChessBoardElement, type IChessPieceMovement, ChessPieceTeam } from "../interfaces";
import { useContext } from "react";
import { GamePhaseContext } from "../context/game-phase-provider";
import { GamePhase } from "../context/context-interfaces";
import { getIdCoordinates } from "../utils/getIdCoordinates";

export const useChessClickHandler = (selectedId: string | null, currentPlayer: ChessPieceTeam, highlightedElements: IChessPieceMovement[], isCheckmateState: boolean, whiteTime: number, blackTime: number, setSelectedId: (id: string | null) => void, handleMove: (fromId: string, toId: string) => void) => {
    const {currentPhase} = useContext(GamePhaseContext);
    
    const handleClick = (element: IChessBoardElement) => {
        if (isCheckmateState || currentPhase !== GamePhase.ONGOING) {
            return;
        }
        if (whiteTime === 0 || blackTime === 0) {
            return;
        }

        if (selectedId === null) {
            if (element.value?.team === currentPlayer) {
                setSelectedId(element.id);
            }
            return;
        }

        if (selectedId !== null) {
            const isHighlightedCell = highlightedElements.some(highlighted => 
                highlighted.row === getIdCoordinates(element.id).row && 
                highlighted.column === getIdCoordinates(element.id).column
            );

            if (isHighlightedCell) {
                handleMove(selectedId, element.id);
            } else {
                if (element.value?.team === currentPlayer) {
                    setSelectedId(element.id);
                } else {
                    setSelectedId(null);
                }
            }
        }
    }

    return {
        handleClick,
    }
}