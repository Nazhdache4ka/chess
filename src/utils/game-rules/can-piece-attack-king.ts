import { ChessPieceTeam, ChessPieceType, type IChessBoardElement } from "../../interfaces";
import { availableMovementsForChessPieceType } from "../chess-piece-movements";

export const canPieceAttackKing = (elements: IChessBoardElement[][], element: IChessBoardElement, kingRow: number, kingColumn: number, rowIndex: number, columnIndex: number): boolean => {
    if (element.value?.type === ChessPieceType.PAWN) {

        if (element.value?.team === ChessPieceTeam.WHITE) {
            const leftAttackRow = rowIndex - 1;
            const leftAttackColumn = columnIndex - 1;

            if (leftAttackRow >= 0 && leftAttackColumn >= 0 && leftAttackRow === kingRow && leftAttackColumn === kingColumn) {
                return true;
            }

            const rightAttackRow = rowIndex - 1;
            const rightAttackColumn = columnIndex + 1;
            
            if (rightAttackRow >= 0 && rightAttackColumn < 8 && rightAttackRow === kingRow && rightAttackColumn === kingColumn) {
                return true;
            }
        } else {
            const leftAttackRow = rowIndex + 1;
            const leftAttackColumn = columnIndex - 1;

            if (leftAttackRow < 8 && leftAttackColumn >= 0 && leftAttackRow === kingRow && leftAttackColumn === kingColumn) {
                return true;
            }

            const rightAttackRow = rowIndex + 1;
            const rightAttackColumn = columnIndex + 1;

            if (rightAttackRow < 8 && rightAttackColumn < 8 && rightAttackRow === kingRow && rightAttackColumn === kingColumn) {
                return true;
            }
        }
    } else {
        if (!element.value?.type) {
            return false;
        }

        const availableMovements = availableMovementsForChessPieceType[element.value?.type]

        if (!availableMovements) {
            return false;
        }

        if (element.value?.type === ChessPieceType.KNIGHT || element.value?.type === ChessPieceType.KING) {
            return availableMovements.some((movement) => {
                const attackRow = rowIndex + movement.row;
                const attackColumn = columnIndex + movement.column;

                return attackRow >= 0 && attackRow < 8 && attackColumn >= 0 && attackColumn < 8 && attackRow === kingRow && attackColumn === kingColumn;
            });
        } else {
            if (element.value?.type === ChessPieceType.ROOK) {

                if (rowIndex !== kingRow && columnIndex !== kingColumn) {
                    return false;
                }

                const rookRowStep = rowIndex === kingRow ? 0 : (kingRow > rowIndex ? 1 : -1);
                const rookColumnStep = columnIndex === kingColumn ? 0 : (kingColumn > columnIndex ? 1 : -1);

                let checkRow = rowIndex + rookRowStep;
                let checkColumn = columnIndex + rookColumnStep;

                while (checkRow !== kingRow || checkColumn !== kingColumn) {
                    if (elements[checkRow][checkColumn].value) {
                        return false;
                    }
                    checkRow += rookRowStep;
                    checkColumn += rookColumnStep;
                }

                return true;
            }

            if (element.value?.type === ChessPieceType.BISHOP) {
                    const rowDiff = Math.abs(kingRow - rowIndex);
                    const colDiff = Math.abs(kingColumn - columnIndex);
                    
                    if (rowDiff !== colDiff) {
                        return false;
                    }
                    
                    const rowStep = kingRow > rowIndex ? 1 : -1;
                    const colStep = kingColumn > columnIndex ? 1 : -1;
                    
                    let checkRow = rowIndex + rowStep;
                    let checkCol = columnIndex + colStep;
                    
                    while (checkRow !== kingRow && checkCol !== kingColumn) {
                        if (elements[checkRow][checkCol].value) {
                            return false;
                        }
                        checkRow += rowStep;
                        checkCol += colStep;
                    }

                return true;
            }

            if (element.value?.type === ChessPieceType.QUEEN) {
                const rowDiff = Math.abs(kingRow - rowIndex);
                const colDiff = Math.abs(kingColumn - columnIndex);

                if (rowIndex !== kingRow && columnIndex !== kingColumn && rowDiff !== colDiff) {
                    return false;
                }

                let rowStep = 0;
                let colStep = 0;

                if (rowIndex === kingRow) {
                    colStep = kingColumn > columnIndex ? 1 : -1;
                } else if (columnIndex === kingColumn) {
                    rowStep = kingRow > rowIndex ? 1 : -1;
                } else {
                    rowStep = kingRow > rowIndex ? 1 : -1;
                    colStep = kingColumn > columnIndex ? 1 : -1;
                }

                let checkRow = rowIndex + rowStep;
                let checkCol = columnIndex + colStep;

                while (checkRow !== kingRow || checkCol !== kingColumn) {
                    if (elements[checkRow][checkCol].value) {
                        return false;
                    }
                    checkRow += rowStep;
                    checkCol += colStep;
                }

                return true;
            }
        }
    }
    
    return false;
}