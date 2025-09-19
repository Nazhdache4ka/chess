import { ChessPieceTeam, ChessPieceType, type ICastleRights, type IChessBoardElement } from "../../../interfaces";
import { getIdCoordinates } from "../../../utils/getIdCoordinates";

export const performCastle = (newElements: IChessBoardElement[][], setCastleRights: React.Dispatch<React.SetStateAction<ICastleRights>>, currentPlayer: ChessPieceTeam, fromRow: number, fromColumn: number, sideRookId: string) => {
    const rookRow = getIdCoordinates(sideRookId).row;
    const rookColumn = getIdCoordinates(sideRookId).column;
    
    if (currentPlayer === ChessPieceTeam.WHITE) {

            if (newElements[rookRow][rookColumn].value?.type === ChessPieceType.ROOK && newElements[rookRow][rookColumn].value?.team === ChessPieceTeam.WHITE) {
                const kingElement = newElements[fromRow][fromColumn];
                const rookElement = newElements[rookRow][rookColumn];

                if (rookColumn === 7) {
                    setCastleRights((prev) => ({
                        ...prev,
                        white: {
                            ...prev.white,
                            kingMoved: true,
                            rookKingsideMoved: true
                        }
                    }));
                } else {
                    setCastleRights((prev) => ({
                        ...prev,
                        white: {
                            ...prev.white,
                            kingMoved: true,
                            rookQueensideMoved: true
                        }
                    }));
                }

                return {rookElement, kingElement};
            }
    }

    if (currentPlayer === ChessPieceTeam.BLACK) {
        if (newElements[rookRow][rookColumn].value?.type === ChessPieceType.ROOK && newElements[rookRow][rookColumn].value?.team === ChessPieceTeam.BLACK) {

            const kingElement = newElements[fromRow][fromColumn];
            const rookElement = newElements[rookRow][rookColumn];

            if (rookColumn === 7) {
                setCastleRights((prev) => ({
                    ...prev,
                    black: {
                        ...prev.black,
                        kingMoved: true,
                        rookKingsideMoved: true
                    }
                }));
            } else {
                setCastleRights((prev) => ({
                    ...prev,
                    black: {
                        ...prev.black,
                        kingMoved: true,
                        rookQueensideMoved: true
                    }
                }));
            }

            

            return {rookElement, kingElement};
        }
    }
}
