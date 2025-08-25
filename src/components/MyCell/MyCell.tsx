import styles from './MyCell.module.css';
import { type IChessBoardElement, type IChessPieceMovement } from '../../interfaces';
import { getChessPieceSymbol } from '../../utils/chess-piece-symbols';
import { boardColor } from '../../utils/board-color';

interface MyCellProps {
    highlightedElements: IChessPieceMovement[];
    indexRow: number;
    indexColumn: number;
    element: IChessBoardElement;
    onClick: () => void;
}

function MyCell({element, highlightedElements, indexRow, indexColumn, onClick}: MyCellProps) {
    const pieceSymbol = getChessPieceSymbol(element.value);

    return (
        <div
            className={styles.cell}
            style={{backgroundColor: boardColor(indexRow, indexColumn),
                ...(highlightedElements.some((highlightedElement: IChessPieceMovement) => highlightedElement.row === indexRow && highlightedElement.column === indexColumn) ? {backgroundColor: 'red'} : {})
            }} 
            onClick={onClick}
        >
            <span className={styles.piece}>
                {pieceSymbol}
            </span>
        </div>
    );
};

export default MyCell;