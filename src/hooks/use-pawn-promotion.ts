import { useState, useEffect } from "react";
import type { ChessPieceTeam, ChessPieceType, IChessBoardElement, IPawnPromotion } from "../interfaces";
import { promotePawn } from "../utils/game-rules/pawn-promotion/promote-pawn";

export const usePawnPromotion = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, setElements: (elements: IChessBoardElement[][]) => void, setSelectedId: (selectedId: string | null) => void, setCurrentPlayer: (currentPlayer: ChessPieceTeam) => void) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [targetPawn, setTargetPawn] = useState<IPawnPromotion | null>(null);

    const resetPawnPromotion = () => {
        setModalVisible(false);
        setTargetPawn(null);
    }

    const onPieceSelect = (piece: ChessPieceType) => {
        if (targetPawn && piece) {
            promotePawn(elements, currentPlayer, targetPawn, piece, setElements, setSelectedId, setCurrentPlayer);
            setModalVisible(false);
            setTargetPawn(null);
        }
    }

    useEffect(() => {
        if (targetPawn) {
            setModalVisible(true);
        }
    }, [targetPawn]);

    return {
        modalVisible,
        setTargetPawn,
        resetPawnPromotion,
        onPieceSelect,
    }
}