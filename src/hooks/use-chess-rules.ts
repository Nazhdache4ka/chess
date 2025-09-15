import { useEffect, useState } from "react";
import { ChessPieceTeam, type ICastleRights, type IChessBoardElement } from "../interfaces";
import { initialCastleMovements } from "../models/initial-castle-movements";
import { isKingChecked } from "../utils/game-rules/is-king-checked";
import { isCheckmate } from "../utils/checkmate-logic/is-checkmate";

export const useChessRules = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam) => {
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [isCheckmateState, setIsCheckmateState] = useState<boolean>(false);
    const [castleRights, setCastleRights] = useState<ICastleRights>({
        white: initialCastleMovements,
        black: initialCastleMovements
    });

    const resetChessRules = () => {
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
    }, [elements, currentPlayer])

    return {
        isCheck,
        isCheckmateState,
        castleRights,
        setCastleRights,
        resetChessRules,
    }
}