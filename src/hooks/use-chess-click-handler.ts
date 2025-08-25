import { type IChessBoardElement, type IChessPieceMovement, ChessPieceTeam } from "../interfaces";


const useChessClickHandler = (selectedId: string | null, currentPlayer: ChessPieceTeam, selectedElement: IChessBoardElement | null, highlightedElements: IChessPieceMovement[], isCheckmateState: boolean, setSelectedId: (id: string | null) => void, handleMove: (fromId: string, toId: string) => void) => {
    const handleClick = (element: IChessBoardElement) => {
        if (isCheckmateState) {
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
                highlighted.row === parseInt(element.id.split('-')[0]) && 
                highlighted.column === parseInt(element.id.split('-')[1])
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

export default useChessClickHandler;