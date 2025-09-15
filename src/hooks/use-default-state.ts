import { useEffect, useState } from "react";
import { type IChessBoardElement, ChessPieceTeam } from "../interfaces";
import { initialElements } from "../utils/initial-elements";
import { fillChessBoard } from "../utils/fill-chess-board";

export const useDefaultState = () => {
    const [elements, setElements] = useState<IChessBoardElement[][]>(initialElements);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<ChessPieceTeam>(ChessPieceTeam.WHITE);

    const resetDefaultState = () => {
        setElements(initialElements);
        setSelectedId(null);
        setCurrentPlayer(ChessPieceTeam.WHITE);
    }

    useEffect(() => {
        setElements(fillChessBoard(initialElements));
    }, []);

    return {
        elements,
        selectedId,
        currentPlayer,
        setElements,
        setSelectedId,
        setCurrentPlayer,
        resetDefaultState,
    }
}