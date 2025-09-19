import { type IChessBoardElement, type IPawnPromotion, ChessPieceTeam, ChessPieceType } from "../../../interfaces";
import { getIdCoordinates } from "../../../utils/getIdCoordinates";

export const promotePawn = (elements: IChessBoardElement[][], currentPlayer: ChessPieceTeam, targetPawn: IPawnPromotion | null, selectedPiece: ChessPieceType | null, setElements: (elements: IChessBoardElement[][]) => void, setSelectedId: (selectedId: string | null) => void, setCurrentPlayer: (currentPlayer: ChessPieceTeam) => void) => {
    console.log('promoting pawn');
    console.log(currentPlayer);
    console.log(targetPawn);
    console.log(selectedPiece);

    if (!targetPawn) {
        return;
    }
    if (!selectedPiece) {
        return;
    }

    const fromCoordinates = getIdCoordinates(targetPawn.fromId);
    const toCoordinates = getIdCoordinates(targetPawn.toId);

    const newElements = elements.map((row: IChessBoardElement[]) => row.map((element: IChessBoardElement) => 
        ({...element})
    ));

    if (currentPlayer === ChessPieceTeam.WHITE) {
        newElements[toCoordinates.row][toCoordinates.column].value = {
            type: selectedPiece,
            team: ChessPieceTeam.WHITE,
        };
        newElements[fromCoordinates.row][fromCoordinates.column].value = null;
    } else {
        newElements[toCoordinates.row][toCoordinates.column].value = {
            type: selectedPiece,
            team: ChessPieceTeam.BLACK,
        };
        newElements[fromCoordinates.row][fromCoordinates.column].value = null;
    }

    setSelectedId(null);
    setCurrentPlayer(currentPlayer === ChessPieceTeam.WHITE ? ChessPieceTeam.BLACK : ChessPieceTeam.WHITE);
    setElements(newElements);
}