import styles from './MyCell.module.css';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { ChessPieceTeam, type IChessBoardElement, type IChessPieceMovement } from '../../interfaces';
import { getChessPieceSymbol } from '../../utils/chess-piece-symbols';
import { boardColor } from '../../utils/board-color';

interface MyCellProps {
    highlightedElements: IChessPieceMovement[];
    indexRow: number;
    indexColumn: number;
    element: IChessBoardElement;
    currentPlayer: ChessPieceTeam;
    onClick: () => void;
}

function MyCell({element, highlightedElements, indexRow, indexColumn, currentPlayer, onClick}: MyCellProps) {
    const pieceSymbol = getChessPieceSymbol(element.value);

    const isHighlighted = highlightedElements.some((highlightedElement: IChessPieceMovement) => highlightedElement.row === indexRow && highlightedElement.column === indexColumn);

    const getBackgroundColor = boardColor(indexRow, indexColumn);

    // '#f0d9b5' - white
    // '#b58863' - black

    const isDraggablePiece = element.value !== null && element.value?.team === currentPlayer;

    const {attributes, listeners, setNodeRef: setNodeRefDraggable} = useDraggable({
        id: element.id,
        disabled: !isDraggablePiece,
    });

    const {setNodeRef: setNodeRefDroppable, isOver} = useDroppable({
        id: element.id,
    });

    return (
        <div
            className={`${styles.cell} ${getBackgroundColor ? styles.white : styles.black} ${isHighlighted ? styles.highlighted : ''} ${isOver ? styles.dragOver : ''}`}
            ref={setNodeRefDroppable}
            onClick={onClick}
        >
            <span 
                className={styles.piece}
                {...attributes}
                {...listeners}
                ref={setNodeRefDraggable}
            >
                {pieceSymbol}
            </span>
        </div>
    );
};

export default MyCell;