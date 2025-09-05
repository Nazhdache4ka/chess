import { useEffect, useState } from "react";
import { ChessPieceTeam } from "../interfaces";

export const useGameTime = (currentPlayer: ChessPieceTeam, isCheckmateState: boolean) => {
    const [whiteTime, setWhiteTime] = useState<number>(60);
    const [blackTime, setBlackTime] = useState<number>(60);
    
    const resetTime = () => {
        setWhiteTime(60);
        setBlackTime(60);
    }
    
    useEffect(() => {
        if (isCheckmateState) {
            return;
        }

        const interval = setInterval(() => {
            if (currentPlayer === ChessPieceTeam.WHITE) {
                setWhiteTime((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    }
                    return 0;
                });
            } else {
                setBlackTime((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    }
                    return 0;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentPlayer, isCheckmateState]);

    return {whiteTime, blackTime, resetTime};
}