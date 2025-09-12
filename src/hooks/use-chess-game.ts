import { useEffect, useState } from "react";
import { usePawnPromotion } from "./use-pawn-promotion";
import { useGameTime } from "./use-game-time";
import { type IChessBoardElement, ChessPieceTeam, type ICastleRights } from "../interfaces";
import { initialElements } from "../utils/initial-elements";
import { isValidMoveForChecks } from "../utils/game-rules/move-validation/is-valid-move-for-checks";
import { movePiece } from "../utils/game-rules/move-piece";
import { isKingChecked } from "../utils/game-rules/is-king-checked";
import { fillChessBoard } from "../utils/fill-chess-board";
import { isCheckmate } from "../utils/checkmate-logic/is-checkmate";
import { initialCastleMovements } from "../models/initial-castle-movements";
import { isPawnToBePromoted } from "../utils/game-rules/pawn-promotion/is-pawn-to-be-promoted";


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
    const {whiteTime, blackTime, resetTime} = useGameTime(currentPlayer, isCheckmateState);
    const {modalVisible, setTargetPawn, onPieceSelect} = usePawnPromotion(elements, currentPlayer, setElements, setSelectedId, setCurrentPlayer);

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

    const resetGame = () => {
        setElements(fillChessBoard(initialElements));
        setSelectedId(null);
        setCurrentPlayer(ChessPieceTeam.WHITE);
        setIsCheck(false);
        setIsCheckmateState(false);
        resetTime();
        setCastleRights({
            white: initialCastleMovements,
            black: initialCastleMovements
        });
        setTargetPawn(null);
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
        whiteTime,
        blackTime,
        modalVisible,
        onPieceSelect,
        setSelectedId,
        handleMove,
        resetGame,
    }
}