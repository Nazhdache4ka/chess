import { ChessPieceTeam, ChessPieceType, type ICastleRights, type IChessBoardElement } from "../../../interfaces";

export const performCastle = (newElements: IChessBoardElement[][], setCastleRights: React.Dispatch<React.SetStateAction<ICastleRights>>, currentPlayer: ChessPieceTeam, fromRow: number, fromColumn: number, sideRookId: string) => {
    if (currentPlayer === ChessPieceTeam.WHITE) {

            if (newElements[7][7].value?.type === ChessPieceType.ROOK && newElements[7][7].value?.team === ChessPieceTeam.WHITE) {
                const rookRow = parseInt(sideRookId.split('-')[0]);
                const rookColumn = parseInt(sideRookId.split('-')[1]);

                const kingElement = newElements[fromRow][fromColumn];
                const rookElement = newElements[rookRow][rookColumn];

                setCastleRights((prev) => ({
                    ...prev,
                    white: {
                        ...prev.white,
                        kingMoved: true,
                        rookKingsideMoved: true
                    }
                }));

                return {rookElement, kingElement};
            }

            if (newElements[7][0].value?.type === ChessPieceType.ROOK && newElements[7][0].value?.team === ChessPieceTeam.WHITE) {
                const rookRow = parseInt(sideRookId.split('-')[0]);
                const rookColumn = parseInt(sideRookId.split('-')[1]);

                const kingElement = newElements[fromRow][fromColumn];
                const rookElement = newElements[rookRow][rookColumn];

                setCastleRights((prev) => ({
                    ...prev,
                    white: {
                        ...prev.white,
                        kingMoved: true,
                        rookQueensideMoved: true
                    }
                }));

                return {rookElement, kingElement};
            }
    }

    if (currentPlayer === ChessPieceTeam.BLACK) {
        if (newElements[0][7].value?.type === ChessPieceType.ROOK && newElements[0][7].value?.team === ChessPieceTeam.BLACK) {
            const rookRow = parseInt(sideRookId.split('-')[0]);
            const rookColumn = parseInt(sideRookId.split('-')[1]);

            const kingElement = newElements[fromRow][fromColumn];
            const rookElement = newElements[rookRow][rookColumn];

            setCastleRights((prev) => ({
                ...prev,
                black: {
                    ...prev.black,
                    kingMoved: true,
                    rookKingsideMoved: true
                }
            }));

            return {rookElement, kingElement};
        }
    }

    if (currentPlayer === ChessPieceTeam.BLACK) {
        if (newElements[0][0].value?.type === ChessPieceType.ROOK && newElements[0][0].value?.team === ChessPieceTeam.BLACK) {
            const rookRow = parseInt(sideRookId.split('-')[0]);
            const rookColumn = parseInt(sideRookId.split('-')[1]);

            const kingElement = newElements[fromRow][fromColumn];
            const rookElement = newElements[rookRow][rookColumn];

            setCastleRights((prev) => ({
                ...prev,
                black: {
                    ...prev.black,
                    kingMoved: true,
                    rookQueensideMoved: true
                }
            }));

            return {rookElement, kingElement};
        }
    }
}
