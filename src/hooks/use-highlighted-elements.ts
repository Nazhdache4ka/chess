import { useMemo } from "react";
import { ChessPieceTeam, ChessPieceType, type ICastleRights, type IChessBoardElement, type IChessPieceMovement } from "../interfaces";
import { getPossibleMoves } from "../utils/game-rules/get-possible-moves";
import { canCastle } from "../utils/game-rules/castle-logic/can-castle";

export const useHighlightedElements = (elements: IChessBoardElement[][], selectedElement: IChessBoardElement | null, selectedElementRow: number, selectedElementColumn: number, currentPlayer: ChessPieceTeam, castleRights: ICastleRights, isCheck: boolean) => {
    const highlightedElements = useMemo(() => {
      if (!selectedElement?.value?.type) {
        return [];
      };

      const highlightedElements: IChessPieceMovement[] = getPossibleMoves(elements, selectedElementRow, selectedElementColumn, currentPlayer, selectedElement);

      if (highlightedElements.length !== 0) {

        if (selectedElement?.value.type === ChessPieceType.KING) {

          if (currentPlayer === ChessPieceTeam.WHITE) {
            const canCastleResult = canCastle(elements, castleRights, currentPlayer, isCheck);

            if (!canCastleResult || !canCastleResult.canCastle) {
              return highlightedElements;
            }

            if (canCastleResult.canCastleShortSide) {
              if (canCastleResult.isPathClearShortSide) {
              highlightedElements.push({
                row: 7,
                  column: 6,
                })
              }
            }
          
            if (canCastleResult.canCastleLongSide) {
              if (canCastleResult.isPathClearLongSide) {
              highlightedElements.push({
                row: 7,
                  column: 2,
                })
              }
            }
          } else {
            const canCastleResult = canCastle(elements, castleRights, currentPlayer, isCheck);

            if (!canCastleResult || !canCastleResult.canCastle) {
              return highlightedElements;
            }

            if (canCastleResult.canCastleShortSide) {
              if (canCastleResult.isPathClearShortSide) {
                highlightedElements.push({
                  row: 0,
                  column: 6,
                })
              }
            }

            if (canCastleResult.canCastleLongSide) {
              if (canCastleResult.isPathClearLongSide) {
                highlightedElements.push({
                  row: 0,
                  column: 2,
                })
              }
            }
          }
        }
      }

      // if (selectedElement?.value?.type === ChessPieceType.PAWN) {

      //   // Ходы белых пешек
      //   if (selectedElement?.value?.team === ChessPieceTeam.WHITE) {
        
      //     if (selectedElementRow > 0 && !elements[selectedElementRow - 1][selectedElementColumn].value) {
      //       highlightedElements.push({
      //         row: selectedElementRow - 1,
      //         column: selectedElementColumn,
      //       })

      //       if (selectedElementRow === 6 && !elements[selectedElementRow - 2][selectedElementColumn].value) {
      //         highlightedElements.push({
      //           row: selectedElementRow - 2,
      //           column: selectedElementColumn,
      //         })
      //       }
      //     }

      //     if (selectedElementRow > 0) {
          
      //       if (selectedElementColumn > 0 && elements[selectedElementRow - 1][selectedElementColumn - 1].value && elements[selectedElementRow - 1][selectedElementColumn - 1].value?.team === ChessPieceTeam.BLACK) {
      //         highlightedElements.push({
      //           row: selectedElementRow - 1,
      //           column: selectedElementColumn - 1,
      //         })
      //       }

      //       if (selectedElementColumn < 7 && elements[selectedElementRow - 1][selectedElementColumn + 1].value && elements[selectedElementRow - 1][selectedElementColumn + 1].value?.team === ChessPieceTeam.BLACK) {
      //         highlightedElements.push({
      //           row: selectedElementRow - 1,
      //         column: selectedElementColumn + 1,
      //         })
      //       }
      //     }
      //   } else {

      //     // Ходы черных пешек
      //     if (selectedElementRow < 7 && !elements[selectedElementRow + 1][selectedElementColumn].value) {
      //       highlightedElements.push({
      //         row: selectedElementRow + 1,
      //         column: selectedElementColumn,
      //       })
  
      //       if (selectedElementRow === 1 && !elements[selectedElementRow + 2][selectedElementColumn].value) {
      //         highlightedElements.push({
      //           row: selectedElementRow + 2,
      //           column: selectedElementColumn,
      //         })
      //       }
      //     }

      //     if (selectedElementRow < 7) {

      //       if (selectedElementColumn > 0 && elements[selectedElementRow + 1][selectedElementColumn - 1].value && elements[selectedElementRow + 1][selectedElementColumn - 1].value?.team === ChessPieceTeam.WHITE) {
      //         highlightedElements.push({
      //           row: selectedElementRow + 1,
      //           column: selectedElementColumn - 1,
      //         })
      //       }

      //       if (selectedElementColumn < 7 && elements[selectedElementRow + 1][selectedElementColumn + 1].value && elements[selectedElementRow + 1][selectedElementColumn + 1].value?.team === ChessPieceTeam.WHITE) {
      //         highlightedElements.push({
      //           row: selectedElementRow + 1,
      //           column: selectedElementColumn + 1,
      //         })
      //       }
      //     }
      //   }
      // } else {

      //   // Ходы остальных фигур
      //   const availableMovements = availableMovementsForChessPieceType[selectedElement.value.type]

      //   if (availableMovements) {
      //     availableMovements.forEach((movement) => {
      //       const newRow = selectedElementRow + movement.row;
      //       const newColumn = selectedElementColumn + movement.column;

      //       if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {

      //         if (!elements[newRow][newColumn].value || elements[newRow][newColumn].value?.team !== currentPlayer) {
                
      //           if (selectedElement.value?.type === ChessPieceType.BISHOP || selectedElement.value?.type === ChessPieceType.QUEEN || selectedElement.value?.type === ChessPieceType.ROOK) {
      //             let isPathClear = true;

      //             const rowStep = movement.row === 0 ? 0 : movement.row > 0 ? 1 : -1;
      //             const columnStep = movement.column === 0 ? 0 : movement.column > 0 ? 1 : -1;

      //             let checkRow = selectedElementRow + rowStep;
      //             let checkColumn = selectedElementColumn + columnStep;

      //             while (checkRow !== newRow || checkColumn !== newColumn) {
      //               if (elements[checkRow][checkColumn].value) {
      //                 isPathClear = false;
      //                 break;
      //               }
      //               checkRow += rowStep;
      //               checkColumn += columnStep;
      //             }

      //             if (isPathClear) {
      //               highlightedElements.push({
      //                 row: newRow,
      //                 column: newColumn,
      //               })
      //             }
      //           } else if (selectedElement.value?.type === ChessPieceType.KING) {

      //             highlightedElements.push({
      //               row: newRow,
      //               column: newColumn,
      //             })

      //             if (currentPlayer === ChessPieceTeam.WHITE) {

      //               const canCastleResult = canCastle(elements, castleRights, currentPlayer, selectedElement.id, isCheck);

      //               if (canCastleResult) {

      //                 if (canCastleResult.canCastle) {

      //                   if (canCastleResult.canCastleShortSide) {
                          
      //                     if (canCastleResult.isPathClearShortSide) {
      //                       highlightedElements.push({
      //                         row: 7,
      //                         column: 6,
      //                       })
      //                     }
      //                   }
  
      //                   if (canCastleResult.canCastleLongSide) {

      //                     if (canCastleResult.isPathClearLongSide) {
      //                       highlightedElements.push({
      //                         row: 7,
      //                         column: 2,
      //                       })
      //                     }
      //                   }
      //                 }
      //               }
      //             } else {
      //               if (currentPlayer === ChessPieceTeam.BLACK) {

      //                 const canCastleResult = canCastle(elements, castleRights, currentPlayer, selectedElement.id, isCheck);

      //                 if (canCastleResult) {

      //                   if (canCastleResult.canCastle) {

      //                     if (canCastleResult.canCastleShortSide) {

      //                       if (canCastleResult.isPathClearShortSide) {
      //                         highlightedElements.push({
      //                           row: 0,
      //                           column: 6,
      //                         })
      //                       }
      //                     }

      //                     if (canCastleResult.canCastleLongSide) {

      //                       if (canCastleResult.isPathClearLongSide) {
      //                         highlightedElements.push({
      //                           row: 0,
      //                           column: 2,
      //                         })
      //                       }
      //                     }
      //                   }
      //                 }
      //               }
      //             }
                  
      //           } else {
      //             highlightedElements.push({
      //               row: newRow,
      //               column: newColumn,
      //             })
      //           }
                
      //         }
      //       }
      //     })
      //   }
      // }

      return highlightedElements;
    }, [elements, selectedElement, selectedElementRow, selectedElementColumn, currentPlayer, castleRights, isCheck]);

    
      
    // const highlightedElements = useMemo<IChessPieceMovement[]>(() => {
    //     if (availableMovements.length === 0) {
    //       return [];
    //     }
    
    //     return availableMovements.map((movement) => {
    //         const highlightedElements: IChessPieceMovement[] = [];
    
    //         elements.forEach((row, rowIndex) =>
    //           row.forEach((element, columnIndex) => {
    //             if (element.id === selectedId) {
    //                 const newRow = rowIndex + movement.row;
    //                 const newColumn = columnIndex + movement.column;

    //                 if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
    //                     if (element.value?.type === ChessPieceType.PAWN && element.value?.team === ChessPieceTeam.WHITE) {
    //                         if (elements[rowIndex - 1][columnIndex - 1].value?.type && elements[rowIndex - 1][columnIndex - 1].value?.team === ChessPieceTeam.BLACK) {
    //                           highlightedElements.push({
    //                             row: rowIndex - 1,
    //                             column: columnIndex - 1,
    //                           })
    //                         }
    //                         if (elements[rowIndex - 1][columnIndex + 1].value?.type && elements[rowIndex - 1][columnIndex + 1].value?.team === ChessPieceTeam.BLACK) {
    //                           highlightedElements.push({
    //                             row: rowIndex - 1,
    //                             column: columnIndex + 1,
    //                           })
    //                         }
    //                         if (elements[rowIndex - 1][columnIndex].value?.type && elements[rowIndex - 1][columnIndex].value?.team === ChessPieceTeam.BLACK) {
    //                           if (elements[rowIndex - 1][columnIndex - 1].value?.type && elements[rowIndex - 1][columnIndex - 1].value?.team === ChessPieceTeam.BLACK) {
    //                             highlightedElements.push({
    //                               row: rowIndex - 1,
    //                               column: columnIndex - 1,
    //                             })
    //                           } 
    //                           if (elements[rowIndex - 1][columnIndex + 1].value?.type && elements[rowIndex - 1][columnIndex + 1].value?.team === ChessPieceTeam.BLACK) {
    //                             highlightedElements.push({
    //                               row: rowIndex - 1,
    //                               column: columnIndex + 1,
    //                             })
    //                           }
    //                           return;
    //                         }
    //                         highlightedElements.push({
    //                             row: rowIndex - 1,
    //                             column: columnIndex,
    //                         });
    //                         highlightedElements.push({
    //                             row: rowIndex - 2,
    //                             column: columnIndex,
    //                         });
    //                         return;
    //                     }
    //                     if (elements[newRow][newColumn].value?.type && elements[newRow][newColumn].value?.team === currentPlayer) {
    //                         return;
    //                     }
    //                     highlightedElements.push({
    //                         row: newRow,
    //                         column: newColumn,
    //                     });
    //                 }
    //             }
    //           })
    //         );
    
    //         return highlightedElements;
    //       })
    //       .flat();
    //   }, [availableMovements, elements, selectedId]);

    return {highlightedElements};
}