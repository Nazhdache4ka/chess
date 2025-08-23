import styles from './MyCell.module.css';
import { type IChessBoardElement } from '../../interfaces';
import { getChessPieceSymbol } from '../../utils/chessPieceSymbols';

interface MyCellProps {
    style: React.CSSProperties;
    element: IChessBoardElement;
    onClick: () => void;
}

const MyCell = ({style, element, onClick}: MyCellProps) => {
    const pieceSymbol = element.value 
        ? getChessPieceSymbol(element.value.type, element.value.team)
        : '';


    return (
        <div
            className={styles.cell}
            style={style}
            onClick={onClick}
        >
            <span className={styles.piece}>
                {pieceSymbol}
            </span>
        </div>
    );
};

export default MyCell;