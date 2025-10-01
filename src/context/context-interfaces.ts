export const GamePhase = {
    START: "start",
    PAUSE: "pause",
    ONGOING: "ongoing",
} as const

export type GamePhase = typeof GamePhase[keyof typeof GamePhase];

export interface GamePhaseContextType {
    currentPhase: GamePhase;
    setCurrentPhase: (currentPhase: GamePhase) => void;
}