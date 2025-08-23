import { ChessPieceTeam, ChessPieceType, type ICastleRights, type IChessBoardElement } from "../../interfaces";
import { performCastle } from "./castle_logic/performCastle";

export const movePiece = (fromId: string, toId: string, setElements: React.Dispatch<React.SetStateAction<IChessBoardElement[][]>>, setCastleRights: React.Dispatch<React.SetStateAction<ICastleRights>>, currentPlayer: ChessPieceTeam) => {
    setElements((elements: IChessBoardElement[][]) => {
        const newElements = elements.map((row: IChessBoardElement[]) => row.map((element: IChessBoardElement) => 
            ({...element})
        ));

        let fromRow = -1; let fromColumn = -1;
        let toRow = -1; let toColumn = -1;

        for (let i = 0; i < newElements.length; i++) {
            for (let j = 0; j < newElements[i].length; j++) {
                if (newElements[i][j].id === fromId) {
                    fromRow = i; fromColumn = j;
                }
                if (newElements[i][j].id === toId) {
                    toRow = i; toColumn = j;
                }
            }
        }

        if (fromRow !== -1 && fromColumn !== -1 && toRow !== -1 && toColumn !== -1) {

            if (toRow === 7 && toColumn === 6 && fromRow === 7 && fromColumn === 4 && newElements[fromRow][fromColumn].value?.type === ChessPieceType.KING) {
                const shortSideRookId = '7-7'

                const castleResult = performCastle(newElements, setCastleRights, currentPlayer, fromRow, fromColumn, shortSideRookId);

                if (castleResult) {
                    const {rookElement, kingElement} = castleResult;
                    newElements[toRow][toColumn].value = kingElement.value;
                    newElements[fromRow][fromColumn].value = null;

                    
                    newElements[7][5].value = rookElement.value;
                    newElements[7][7].value = null;

                    return newElements;
                }
            }

            if (toRow === 7 && toColumn === 2 && fromRow === 7 && fromColumn === 4 && newElements[fromRow][fromColumn].value?.type === ChessPieceType.KING) {
                const longSideRookId = '7-0'

                const castleResult = performCastle(newElements, setCastleRights, currentPlayer, fromRow, fromColumn, longSideRookId);

                if (castleResult) {
                    const {rookElement, kingElement} = castleResult;
                    newElements[toRow][toColumn].value = kingElement.value;
                    newElements[fromRow][fromColumn].value = null;

                    
                    newElements[7][3].value = rookElement.value;
                    newElements[7][0].value = null;

                    return newElements;
                }
            }

            if (toRow === 0 && toColumn === 6 && fromRow === 0 && fromColumn === 4 && newElements[fromRow][fromColumn].value?.type === ChessPieceType.KING) {
                const shortSideRookId = '0-7'

                const castleResult = performCastle(newElements, setCastleRights, currentPlayer, fromRow, fromColumn, shortSideRookId);

                if (castleResult) {
                    const {rookElement, kingElement} = castleResult;
                    newElements[toRow][toColumn].value = kingElement.value;
                    newElements[fromRow][fromColumn].value = null;

                    newElements[0][5].value = rookElement.value;
                    newElements[0][7].value = null;

                    return newElements;
                }
            }

            if (toRow === 0 && toColumn === 2 && fromRow === 0 && fromColumn === 4 && newElements[fromRow][fromColumn].value?.type === ChessPieceType.KING) {
                const longSideRookId = '0-0'

                const castleResult = performCastle(newElements, setCastleRights, currentPlayer, fromRow, fromColumn, longSideRookId);

                if (castleResult) {

                    const {rookElement, kingElement} = castleResult;
                    newElements[toRow][toColumn].value = kingElement.value;
                    newElements[fromRow][fromColumn].value = null;
    
                    newElements[0][3].value = rookElement.value;
                    newElements[0][0].value = null;
    
                    return newElements;
                }
            }

            

            if (newElements[fromRow][fromColumn].value?.type === ChessPieceType.KING) {
                if (currentPlayer === ChessPieceTeam.WHITE) {
                    setCastleRights((prev) => ({
                        ...prev,
                        white: {
                            ...prev.white,
                            kingMoved: true,
                        }
                    }));
                } else if (currentPlayer === ChessPieceTeam.BLACK) {
                    setCastleRights((prev) => ({
                        ...prev,
                        black: {
                            ...prev.black,
                            kingMoved: true,
                        }
                    }));
                }
            }

            if (newElements[fromRow][fromColumn].value?.type === ChessPieceType.ROOK && fromRow === 7 && fromColumn === 7) {
                if (currentPlayer === ChessPieceTeam.WHITE) {
                    setCastleRights((prev) => ({
                        ...prev,
                        white: {
                            ...prev.white,
                            rookKingsideMoved: true,
                        }
                    }));
                }
            }

            if (newElements[fromRow][fromColumn].value?.type === ChessPieceType.ROOK && fromRow === 7 && fromColumn === 0) {
                if (currentPlayer === ChessPieceTeam.WHITE) {
                    setCastleRights((prev) => ({
                        ...prev,
                        white: {
                            ...prev.white,
                            rookQueensideMoved: true,
                        }
                    }));
                }
            }

            if (newElements[fromRow][fromColumn].value?.type === ChessPieceType.ROOK && fromRow === 0 && fromColumn === 7) {
                if (currentPlayer === ChessPieceTeam.BLACK) {
                    setCastleRights((prev) => ({
                        ...prev,
                        black: {
                            ...prev.black,
                            rookKingsideMoved: true,
                        }
                    }));
                }
            }

            if (newElements[fromRow][fromColumn].value?.type === ChessPieceType.ROOK && fromRow === 0 && fromColumn === 0) {
                if (currentPlayer === ChessPieceTeam.BLACK) {
                    setCastleRights((prev) => ({
                        ...prev,
                        black: {
                            ...prev.black,
                            rookQueensideMoved: true,
                        }
                    }));
                }
            }

            
            const newElement = newElements[fromRow][fromColumn].value;
            newElements[toRow][toColumn].value = newElement;
            newElements[fromRow][fromColumn].value = null;
        }

        return newElements;
    });
}