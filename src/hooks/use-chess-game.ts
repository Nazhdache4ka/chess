import { usePawnPromotion } from "./use-pawn-promotion";
import { useGameTime } from "./use-game-time";
import { useDefaultState } from "./use-default-state";
import { useChessRules } from "./use-chess-rules";
import { useMoveHandler } from "./use-move-handler";


export const useChessGame = () => {
    const {elements, selectedId, currentPlayer, setElements, setSelectedId, setCurrentPlayer, resetDefaultState} = useDefaultState();
    const {isCheck, isCheckmateState, castleRights, setCastleRights, resetChessRules} = useChessRules(elements, currentPlayer);
    const {whiteTime, blackTime, resetTime} = useGameTime(currentPlayer, isCheckmateState);
    const {modalVisible, setTargetPawn, onPieceSelect, resetPawnPromotion} = usePawnPromotion(elements, currentPlayer, setElements, setSelectedId, setCurrentPlayer);
    const {handleMove} = useMoveHandler(elements, currentPlayer, setElements, setCastleRights, setSelectedId, setCurrentPlayer, setTargetPawn);

    const resetGame = () => {
        resetDefaultState();
        resetChessRules();
        resetTime();
        resetPawnPromotion();
    }

    return {
        elements,
        selectedId,
        currentPlayer,
        isCheck,
        castleRights,
        isCheckmateState,
        whiteTime,
        blackTime,
        modalVisible,
        onPieceSelect,
        setSelectedId,
        handleMove,
        resetGame,
    }
}