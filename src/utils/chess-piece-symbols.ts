import { ChessPieceType, ChessPieceTeam, type IChessPieceType } from '../interfaces';

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

export const getChessPieceSymbol = (value: IChessPieceType | null): string => {
  if (!value) {
    return '';
  }
  if (value.team === ChessPieceTeam.WHITE) {
    return WHITE_PIECES[value.type];
  }
  return BLACK_PIECES[value.type];
};