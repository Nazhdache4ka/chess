import { useEffect, useState } from "react";
import { type IChessBoardElement, ChessPieceTeam, type ICastleRights } from "../interfaces";
import { initialElements } from "../utils/initial-elements";
import { isValidMoveForChecks } from "../utils/game-rules/move-validation/is-valid-move-for-checks";
import { movePiece } from "../utils/game-rules/move-piece";
import { isKingChecked } from "../utils/game-rules/is-king-checked";
import { fillChessBoard } from "../utils/fill-chess-board";
import { isCheckmate } from "../utils/checkmate-logic/is-checkmate";
import { initialCastleMovements } from "../models/initial-castle-movements";

export const useChessGame = () => {
    const [elements, setElements] = useState<IChessBoardElement[][]>(initialElements);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<ChessPieceTeam>(ChessPieceTeam.WHITE);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isCheckmateState, setIsCheckmateState] = useState<boolean>(false);
    const [castleRights, setCastleRights] = useState<ICastleRights>({
        white: initialCastleMovements,
        black: initialCastleMovements
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
            white: initialCastleMovements,
            black: initialCastleMovements
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