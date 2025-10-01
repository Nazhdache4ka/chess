import { useContext, useEffect, useState } from "react";
import { GamePhaseContext } from "../context/game-phase-provider";
import { ChessPieceTeam } from "../interfaces";
import { GamePhase } from "../context/context-interfaces";

export const useGameTime = (currentPlayer: ChessPieceTeam, isCheckmateState: boolean) => {
    const [whiteTime, setWhiteTime] = useState<number>(600);
    const [blackTime, setBlackTime] = useState<number>(600);
    const { currentPhase, setCurrentPhase } = useContext(GamePhaseContext);
    
    const resetTime = () => {
        setWhiteTime(600);
        setBlackTime(600);
    }
    console.log(currentPhase);
    useEffect(() => {
        if (isCheckmateState || currentPhase !== GamePhase.ONGOING) {
            return;
        }

        const interval = setInterval(() => {
            if (currentPlayer === ChessPieceTeam.WHITE) {
                setWhiteTime((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    }
                    setCurrentPhase(GamePhase.PAUSE);
                    return 0;
                });
            } else {
                setBlackTime((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    }
                    setCurrentPhase(GamePhase.PAUSE);
                    return 0;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentPlayer, isCheckmateState, currentPhase]);

    return {whiteTime, blackTime, resetTime};
}