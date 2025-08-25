import { useMemo } from "react";
import { type ICastleRights, type IChessBoardElement, type IChessPieceMovement } from "../interfaces";
import { availableMovementsForChessPieceType } from "../utils/chess-piece-movements";
import { ChessPieceType, ChessPieceTeam } from "../interfaces";
import { canCastle } from "../utils/game-rules/castle-logic/can-castle";

export const useHighlightedElements = (elements: IChessBoardElement[][], selectedId: string | null, currentPlayer: ChessPieceTeam, castleRights: ICastleRights, isCheck: boolean) => {
    const selectedElement = useMemo(
        () => elements.flat().find((element) => element.id === selectedId) ?? null,
        [elements, selectedId]
    );

    const highlightedElements = useMemo(() => {
      if (!selectedElement?.value?.type) {
        return [];
      };

      const highlightedElements: IChessPieceMovement[] = [];

      let pieceRow = -1;
      let pieceColumn = -1;

      for (let i = 0; i < elements.length; i++) {
          for (let j = 0; j < elements[i].length; j++) {
              if (elements[i][j].id === selectedId) {
                  pieceRow = i;
                  pieceColumn = j;
                  break;
              }
          }
          if (pieceRow !== -1) break;
      }

      if (pieceRow === -1) {
          return [];
      }

      if (selectedElement?.value?.type === ChessPieceType.PAWN) {

        // Ходы белых пешек
        if (selectedElement?.value?.team === ChessPieceTeam.WHITE) {
        
          if (pieceRow > 0 && !elements[pieceRow - 1][pieceColumn].value) {
            highlightedElements.push({
              row: pieceRow - 1,
              column: pieceColumn,
            })

            if (pieceRow === 6 && !elements[pieceRow - 2][pieceColumn].value) {
              highlightedElements.push({
                row: pieceRow - 2,
                column: pieceColumn,
              })
            }
          }

          if (pieceRow > 0) {
          
            if (pieceColumn > 0 && elements[pieceRow - 1][pieceColumn - 1].value && elements[pieceRow - 1][pieceColumn - 1].value?.team === ChessPieceTeam.BLACK) {
              highlightedElements.push({
                row: pieceRow - 1,
                column: pieceColumn - 1,
              })
            }

            if (pieceColumn < 7 && elements[pieceRow - 1][pieceColumn + 1].value && elements[pieceRow - 1][pieceColumn + 1].value?.team === ChessPieceTeam.BLACK) {
              highlightedElements.push({
                row: pieceRow - 1,
              column: pieceColumn + 1,
              })
            }
          }
        } else {

          // Ходы черных пешек
          if (pieceRow < 7 && !elements[pieceRow + 1][pieceColumn].value) {
            highlightedElements.push({
              row: pieceRow + 1,
              column: pieceColumn,
            })
  
            if (pieceRow === 1 && !elements[pieceRow + 2][pieceColumn].value) {
              highlightedElements.push({
                row: pieceRow + 2,
                column: pieceColumn,
              })
            }
          }

          if (pieceRow < 7) {

            if (pieceColumn > 0 && elements[pieceRow + 1][pieceColumn - 1].value && elements[pieceRow + 1][pieceColumn - 1].value?.team === ChessPieceTeam.WHITE) {
              highlightedElements.push({
                row: pieceRow + 1,
                column: pieceColumn - 1,
              })
            }

            if (pieceColumn < 7 && elements[pieceRow + 1][pieceColumn + 1].value && elements[pieceRow + 1][pieceColumn + 1].value?.team === ChessPieceTeam.WHITE) {
              highlightedElements.push({
                row: pieceRow + 1,
                column: pieceColumn + 1,
              })
            }
          }
        }
      } else {

        // Ходы остальных фигур
        const availableMovements = availableMovementsForChessPieceType[selectedElement.value.type]

        if (availableMovements) {
          availableMovements.forEach((movement) => {
            const newRow = pieceRow + movement.row;
            const newColumn = pieceColumn + movement.column;

            if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {

              if (!elements[newRow][newColumn].value || elements[newRow][newColumn].value?.team !== currentPlayer) {
                
                if (selectedElement.value?.type === ChessPieceType.BISHOP || selectedElement.value?.type === ChessPieceType.QUEEN || selectedElement.value?.type === ChessPieceType.ROOK) {
                  let isPathClear = true;

                  const rowStep = movement.row === 0 ? 0 : movement.row > 0 ? 1 : -1;
                  const columnStep = movement.column === 0 ? 0 : movement.column > 0 ? 1 : -1;

                  let checkRow = pieceRow + rowStep;
                  let checkColumn = pieceColumn + columnStep;

                  while (checkRow !== newRow || checkColumn !== newColumn) {
                    if (elements[checkRow][checkColumn].value) {
                      isPathClear = false;
                      break;
                    }
                    checkRow += rowStep;
                    checkColumn += columnStep;
                  }

                  if (isPathClear) {
                    highlightedElements.push({
                      row: newRow,
                      column: newColumn,
                    })
                  }
                } else if (selectedElement.value?.type === ChessPieceType.KING) {

                  highlightedElements.push({
                    row: newRow,
                    column: newColumn,
                  })

                  if (currentPlayer === ChessPieceTeam.WHITE) {

                    const canCastleResult = canCastle(elements, castleRights, currentPlayer, selectedId, isCheck);

                    if (canCastleResult) {

                      if (canCastleResult.canCastle) {

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
                      }
                    }
                  } else {
                    if (currentPlayer === ChessPieceTeam.BLACK) {

                      const canCastleResult = canCastle(elements, castleRights, currentPlayer, selectedId, isCheck);

                      if (canCastleResult) {

                        if (canCastleResult.canCastle) {

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
                  }
                  
                } else {
                  highlightedElements.push({
                    row: newRow,
                    column: newColumn,
                  })
                }
                
              }
            }
          })
        }
      }

      return highlightedElements;
    }, [elements, selectedElement, selectedId, currentPlayer]);

    
      
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

    return {highlightedElements, selectedElement};
}