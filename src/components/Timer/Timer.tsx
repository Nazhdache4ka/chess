import styles from './Timer.module.css';
import { ChessPieceTeam } from '../../interfaces';

interface TimerProps {
    whiteTime: string;
    blackTime: string;
    currentPlayer: ChessPieceTeam;
}

function Timer({whiteTime, blackTime, currentPlayer}: TimerProps) {
    const timerClassNameWhite = () => {
        if (currentPlayer === ChessPieceTeam.WHITE && whiteTime !== '0:00') {
            return styles.timerCurrentPlayerWhite;
        }
        if (whiteTime === '0:00') {
            return styles.timerLost;
        }
        return '';
    };

    const timerClassNameBlack = () => {
        if (currentPlayer === ChessPieceTeam.BLACK && blackTime !== '0:00') {
            return styles.timerCurrentPlayerBlack;
        }
        if (blackTime === '0:00') {
            return styles.timerLost;
        }
        return '';
    };
    
    return (
        <div className={styles.timer}>
            <h1 className={timerClassNameBlack()}>{blackTime}</h1>
            <h1 className={timerClassNameWhite()}>{whiteTime}</h1>
        </div>
    )
}

export default Timer;