import { ChessPieceType, ChessPieceTeam } from '../interfaces';

const WHITE_PIECES = {
  [ChessPieceType.KING]: '♔',
  [ChessPieceType.QUEEN]: '♕',
  [ChessPieceType.ROOK]: '♖',
  [ChessPieceType.BISHOP]: '♗',
  [ChessPieceType.KNIGHT]: '♘',
  [ChessPieceType.PAWN]: '♙',
} as const;

const BLACK_PIECES = {
  [ChessPieceType.KING]: '♚',
  [ChessPieceType.QUEEN]: '♛',
  [ChessPieceType.ROOK]: '♜',
  [ChessPieceType.BISHOP]: '♝',
  [ChessPieceType.KNIGHT]: '♞',
  [ChessPieceType.PAWN]: '♟',
} as const;

export const getChessPieceSymbol = (type: ChessPieceType, team: ChessPieceTeam): string => {
  if (team === ChessPieceTeam.WHITE) {
    return WHITE_PIECES[type];
  }
  return BLACK_PIECES[type];
};