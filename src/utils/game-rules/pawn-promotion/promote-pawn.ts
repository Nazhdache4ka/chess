import { type IChessBoardElement, type IPawnPromotion, ChessPieceTeam, ChessPieceType } from "../../../interfaces";

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

    const fromRow = parseInt(targetPawn.fromId.split('-')[0]);
    const fromColumn = parseInt(targetPawn.fromId.split('-')[1]);
    const toRow = parseInt(targetPawn.toId.split('-')[0]);
    const toColumn = parseInt(targetPawn.toId.split('-')[1]);

    const newElements = elements.map((row: IChessBoardElement[]) => row.map((element: IChessBoardElement) => 
        ({...element})
    ));

    if (currentPlayer === ChessPieceTeam.WHITE) {
        newElements[toRow][toColumn].value = {
            type: selectedPiece,
            team: ChessPieceTeam.WHITE,
        };
        newElements[fromRow][fromColumn].value = null;
    } else {
        newElements[toRow][toColumn].value = {
            type: selectedPiece,
            team: ChessPieceTeam.BLACK,
        };
        newElements[fromRow][fromColumn].value = null;
    }

    setSelectedId(null);
    setCurrentPlayer(currentPlayer === ChessPieceTeam.WHITE ? ChessPieceTeam.BLACK : ChessPieceTeam.WHITE);
    setElements(newElements);
}