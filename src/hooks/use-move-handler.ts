import { ChessPieceTeam, type ICastleRights, type IChessBoardElement, type IPawnPromotion } from "../interfaces";
import { isValidMoveForChecks } from "../utils/game-rules/move-validation/is-valid-move-for-checks";
import { isPawnToBePromoted } from "../utils/game-rules/pawn-promotion/is-pawn-to-be-promoted";
import { movePiece } from "../utils/game-rules/move-piece";

export const useMoveHandler = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, setElements: React.Dispatch<React.SetStateAction<IChessBoardElement[][]>>, setCastleRights: React.Dispatch<React.SetStateAction<ICastleRights>>, setSelectedId: (selectedId: string | null) => void, setCurrentPlayer: (currentPlayer: ChessPieceTeam) => void, setTargetPawn: (targetPawn: IPawnPromotion | null) => void) => {
    const handleMove = (fromId: string, toId: string) => {
        if (isValidMoveForChecks(elements, currentPlayer, fromId, toId)) {
            if (isPawnToBePromoted(elements, currentPlayer, fromId, toId)) {
                setTargetPawn({fromId, toId});
                return;
            } 
            movePiece(fromId, toId, setElements, setCastleRights, currentPlayer);
            setSelectedId(null);
            setCurrentPlayer(currentPlayer === ChessPieceTeam.WHITE ? ChessPieceTeam.BLACK : ChessPieceTeam.WHITE);
        } else {
            setSelectedId(null);
        }
    }

    return { handleMove };
}