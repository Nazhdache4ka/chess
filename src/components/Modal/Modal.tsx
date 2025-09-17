import styles from './Modal.module.css';
import { ChessPieceType } from '../../interfaces';

interface ModalProps {
    modalVisible: boolean;
    onPieceSelect: (piece: ChessPieceType) => void;
}

function Modal({modalVisible, onPieceSelect}: ModalProps) {
    if (!modalVisible) {
        return null;
    }

    console.log('Modal render 2'); 

    return (
        <div className={styles.myModal + ' ' + styles.active} >
            <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.button} onClick={() => onPieceSelect(ChessPieceType.QUEEN)}>Queen</button>
                <button className={styles.button} onClick={() => onPieceSelect(ChessPieceType.ROOK)}>Rook</button>
                <button className={styles.button} onClick={() => onPieceSelect(ChessPieceType.BISHOP)}>Bishop</button>
                <button className={styles.button} onClick={() => onPieceSelect(ChessPieceType.KNIGHT)}>Knight</button>
            </div>
        </div>
    )
}

export default Modal;