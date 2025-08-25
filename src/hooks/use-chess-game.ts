import { useEffect, useState } from "react";
import { type IChessBoardElement, ChessPieceTeam, type ICastleRights } from "../interfaces";
import { initialElements } from "../utils/initialElements";
import { isValidMoveForChecks } from "../utils/game-rules/move_validation/isValidMoveForChecks";
import { movePiece } from "../utils/game-rules/movePiece";
import { isKingChecked } from "../utils/game-rules/isKingChecked";
import { fillChessBoard } from "../utils/fillChessBoard";
import { isCheckmate } from "../utils/checkmate-logic/is-checkmate";

const useChessGame = () => {
    const [elements, setElements] = useState<IChessBoardElement[][]>(initialElements);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<ChessPieceTeam>(ChessPieceTeam.WHITE);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isCheckmateState, setIsCheckmateState] = useState<boolean>(false);
    const [castleRights, setCastleRights] = useState<ICastleRights>({
        white: {kingMoved: false, rookKingsideMoved: false, rookQueensideMoved: false},
        black: {kingMoved: false, rookKingsideMoved: false, rookQueensideMoved: false}
    });


    const handleMove = (fromId: string, toId: string) => {
        if (isValidMoveForChecks(elements, currentPlayer, fromId, toId)) {
            movePiece(fromId, toId, setElements, setCastleRights, currentPlayer);
            setSelectedId(null);
            setCurrentPlayer(currentPlayer === ChessPieceTeam.WHITE ? ChessPieceTeam.BLACK : ChessPieceTeam.WHITE);
        } else {
            setSelectedId(null);
        }
    }

    const resetGame = () => {
        setElements(fillChessBoard(initialElements));
        setSelectedId(null);
        setCurrentPlayer(ChessPieceTeam.WHITE);
        setIsCheck(false);
        setIsCheckmateState(false);
        setCastleRights({
            white: {kingMoved: false, rookKingsideMoved: false, rookQueensideMoved: false},
            black: {kingMoved: false, rookKingsideMoved: false, rookQueensideMoved: false}
        });
    }

    useEffect(() => {
        setIsCheck(isKingChecked(elements, currentPlayer));
        if (isCheck) {
            setIsCheckmateState(isCheckmate(elements, currentPlayer, isCheck));
        } else {
            setIsCheckmateState(false);
        }
    }, [elements, currentPlayer, isCheck]);

    useEffect(() => {
        setElements(fillChessBoard(initialElements));
    }, []);

    return {
        elements,
        selectedId,
        currentPlayer,
        isCheck,
        castleRights,
        isCheckmateState,
        setSelectedId,
        handleMove,
        resetGame,
    }
}

export default useChessGame;