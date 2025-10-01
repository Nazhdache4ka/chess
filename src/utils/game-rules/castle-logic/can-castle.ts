import { type IChessBoardElement, type ICastleRights, ChessPieceTeam } from "../../../interfaces";

export const canCastle = (elements: IChessBoardElement[][], castleRights: ICastleRights, currentPlayer: ChessPieceTeam, isCheck: boolean) => {
    let canCastle = true;
    let canCastleShortSide = true;
    let canCastleLongSide = true;
    let isPathClearShortSide = false;
    let isPathClearLongSide = false;

    if (isCheck) {
        canCastle = false;
    }

    if (currentPlayer === ChessPieceTeam.WHITE) {
        if (castleRights.white.kingMoved) {
            canCastle = false;
        }

        if (castleRights.white.rookKingsideMoved) {
            canCastleShortSide = false;
        }

        if (castleRights.white.rookQueensideMoved) {
            canCastleLongSide = false;
        }

        if (!elements[7][5].value && !elements[7][6].value) {
            isPathClearShortSide = true;
        }

        if (!elements[7][3].value && !elements[7][2].value && !elements[7][1].value) {
            isPathClearLongSide = true;
        }
    }



    if (currentPlayer === ChessPieceTeam.BLACK) {
        if (castleRights.black.kingMoved) {
            canCastle = false;
        }

        if (castleRights.black.rookKingsideMoved) {
            canCastleShortSide = false;
        }

        if (castleRights.black.rookQueensideMoved) {
            canCastleLongSide = false;
        }

        if (!elements[0][5].value && !elements[0][6].value) {
            isPathClearShortSide = true;
        }

        if (!elements[0][3].value && !elements[0][2].value && !elements[0][1].value) {
            isPathClearLongSide = true;
        }
    }

    return {canCastle, canCastleShortSide, canCastleLongSide, isPathClearShortSide, isPathClearLongSide};
}