import { createContext, useMemo, useState } from "react";
import { GamePhase, type GamePhaseContextType } from "./context-interfaces";

export const GamePhaseContext = createContext<GamePhaseContextType>({
    currentPhase: GamePhase.START,
    setCurrentPhase: () => {},
});

export const GamePhaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentPhase, setCurrentPhase] = useState<GamePhase>(GamePhase.START);

    const context = useMemo(() => ({ 
        currentPhase,
        setCurrentPhase,
    }), [currentPhase]);

    return (
        <GamePhaseContext.Provider value={context}>
            {children}
        </GamePhaseContext.Provider>
    );
};