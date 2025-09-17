import Timer from "../Timer/Timer";
import styles from "./GameInfo.module.css";
import { ChessPieceTeam } from "../../interfaces";
import { convertGameTimeWhite, convertGameTimeBlack } from "../../utils/convert-game-time";
import { useContext } from "react";
import { GamePhaseContext } from "../../context/game-phase-provider";
import { GamePhase } from "../../context/context-interfaces";

interface GameInfoProps {
    currentPlayer: ChessPieceTeam;
    isCheckmateState: boolean;
    isCheck: boolean;
    whiteTime: number;
    blackTime: number;
}

function GameInfo({currentPlayer, isCheckmateState, isCheck, whiteTime, blackTime}: GameInfoProps) {
    const { currentPhase } = useContext(GamePhaseContext);

    return (
        <div className={styles.gameInfoContainer}>
            <div className={styles.gameInfo}>
                {currentPhase === GamePhase.PAUSE ? <h2 className={styles.gamePause}>Пауза</h2> : null}
                {currentPhase === GamePhase.START ? <h2 className={styles.gameStart}>Начало игры</h2> : null}
                <h2>Ход: {currentPlayer === ChessPieceTeam.WHITE ? 'Белые' : 'Черные'}</h2>
                {isCheckmateState ? <h3>Шах и мат!</h3> : isCheck && <h3>ШАХ!</h3>}
                {whiteTime === 0 && <h3>Время белых истекло!</h3>}
                {blackTime === 0 && <h3>Время черных истекло!</h3>}
            </div>
            <Timer 
                whiteTime={convertGameTimeWhite(whiteTime)} 
                blackTime={convertGameTimeBlack(blackTime)}
                currentPlayer={currentPlayer}
            />
        </div>
    )
}

export default GameInfo;