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

export interface ICastleRights {
    white: {
        kingMoved: boolean;
        rookKingsideMoved: boolean;
        rookQueensideMoved: boolean;
    },
    black: {
        kingMoved: boolean;
        rookKingsideMoved: boolean;
        rookQueensideMoved: boolean;
    }
}