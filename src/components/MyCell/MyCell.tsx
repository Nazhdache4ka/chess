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

    const isHighlighted = highlightedElements.some((highlightedElement: IChessPieceMovement) => highlightedElement.row === indexRow && highlightedElement.column === indexColumn);

    const getBackgroundColor = boardColor(indexRow, indexColumn);

    // '#f0d9b5' - white
    // '#b58863' - black

    return (
        <div
            className={`${styles.cell} ${getBackgroundColor ? styles.white : styles.black} ${isHighlighted ? styles.highlighted : ''}`} 
            onClick={onClick}
        >
            <span className={styles.piece}>
                {pieceSymbol}
            </span>
        </div>
    );
};

export default MyCell;