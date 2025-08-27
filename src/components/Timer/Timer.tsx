import styles from './Timer.module.css';

interface TimerProps {
    whiteTime: number;
    blackTime: number;
}

function Timer({whiteTime, blackTime}: TimerProps) {
    return (
        <div className={styles.timer}>
            <h1>Время черных: {blackTime}</h1>
            <h1>Время белых: {whiteTime}</h1>
        </div>
    )
}

export default Timer;