import { type IChessBoardElement, type IChessPieceMovement, ChessPieceTeam, ChessPieceType } from "../../interfaces";
import { availableMovementsForChessPieceType } from "../chess-piece-movements";

export const getPossibleMoves = (elements: IChessBoardElement[][], row: number, column: number, currentPlayer: ChessPieceTeam, element: IChessBoardElement) => {
    const possibleMoves: IChessPieceMovement[] = [];

    if (!element.value) {
        return possibleMoves;
    }

    const availableMovements = availableMovementsForChessPieceType[element.value.type];

    if (availableMovements) {
        availableMovements.forEach((movement) => {
            const newRow = row + movement.row;
            const newColumn = column + movement.column;

            if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
                if (!elements[newRow][newColumn].value || elements[newRow][newColumn].value?.team !== currentPlayer) {
                    if (element.value) {
                        if (element.value.type === ChessPieceType.BISHOP || element.value.type === ChessPieceType.QUEEN || element.value.type === ChessPieceType.ROOK) {
                            let isPathClear = true;
    
                            const rowStep = movement.row === 0 ? 0 : movement.row > 0 ? 1 : -1;
                            const columnStep = movement.column === 0 ? 0 : movement.column > 0 ? 1 : -1;

                            let checkRow = row + rowStep;
                            let checkColumn = column + columnStep;

                            while (checkRow !== newRow || checkColumn !== newColumn) {
                                if (elements[checkRow][checkColumn].value) {
                                    isPathClear = false;
                                    break;
                                }
                                checkRow += rowStep;
                                checkColumn += columnStep;
                            }

                            if (isPathClear) {
                                possibleMoves.push({row: newRow, column: newColumn});
                            }
                        } else if (element.value.type === ChessPieceType.KING || element.value.type === ChessPieceType.KNIGHT) {
                            possibleMoves.push({row: newRow, column: newColumn});
                        } else if (element.value.type === ChessPieceType.PAWN) {
                            if (element.value.team === ChessPieceTeam.WHITE) {
                                if (row > 0 && !elements[row - 1][column].value) {
                                    possibleMoves.push({
                                        row: row - 1,
                                        column: column,
                                    })
                          
                                    if (row === 6 && !elements[row - 2][column].value) {
                                        possibleMoves.push({
                                            row: row - 2,
                                            column: column,
                                        })
                                    }
                                    }
                          
                                    if (row > 0) {
                                    
                                      if (column > 0 && elements[row - 1][column - 1].value && elements[row - 1][column - 1].value?.team === ChessPieceTeam.BLACK) {
                                        possibleMoves.push({
                                            row: row - 1,
                                            column: column - 1,
                                        })
                                    }
                          
                                      if (column < 7 && elements[row - 1][column + 1].value && elements[row - 1][column + 1].value?.team === ChessPieceTeam.BLACK) {
                                        possibleMoves.push({
                                            row: row - 1,
                                            column: column + 1,
                                        })
                                      }
                                    }
                            } else {
                                if (row < 7 && !elements[row + 1][column].value) {
                                    possibleMoves.push({
                                      row: row + 1,
                                      column: column,
                                    })
                          
                                    if (row === 1 && !elements[row + 2][column].value) {
                                      possibleMoves.push({
                                        row: row + 2,
                                        column: column,
                                      })
                                    }
                                  }
                        
                                  if (row < 7) {
                        
                                    if (column > 0 && elements[row + 1][column - 1].value && elements[row + 1][column - 1].value?.team === ChessPieceTeam.WHITE) {
                                      possibleMoves.push({
                                        row: row + 1,
                                        column: column - 1,
                                      })
                                    }
                        
                                    if (column < 7 && elements[row + 1][column + 1].value && elements[row + 1][column + 1].value?.team === ChessPieceTeam.WHITE) {
                                      possibleMoves.push({
                                        row: row + 1,
                                        column: column + 1,
                                      })
                                    }
                                  }
                                }
                            }
                        }
                    }
                }
            });
        }
    
    return possibleMoves;
}