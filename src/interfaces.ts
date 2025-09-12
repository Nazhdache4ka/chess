export const ChessPieceType = {
    KING: "king",
    QUEEN: "queen",
    ROOK: "rook",
    BISHOP: "bishop",
    KNIGHT: "knight",
    PAWN: "pawn",
} as const;
  
export type ChessPieceType = typeof ChessPieceType[keyof typeof ChessPieceType];

export const ChessPieceTeam = {
    WHITE: "white",
    BLACK: "black",
} as const;

export type ChessPieceTeam = typeof ChessPieceTeam[keyof typeof ChessPieceTeam];

export interface IChessPieceType {
    type: ChessPieceType;
    team: ChessPieceTeam;
}
  
export interface IChessBoardElement {
    id: string;
    value: IChessPieceType | null;
}

export interface IChessPieceMovement {
    row: number;
    column: number;
}

interface PieceMovementState {
    kingMoved: boolean;
    rookKingsideMoved: boolean;
    rookQueensideMoved: boolean;
}

export interface ICastleRights {
    white: PieceMovementState;
    black: PieceMovementState;
}

export interface IPawnPromotion {
    fromId: string;
    toId: string;
}