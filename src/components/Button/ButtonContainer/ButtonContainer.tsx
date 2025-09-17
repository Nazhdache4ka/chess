import Button from "../Button";
import { GamePhase } from "../../../context/context-interfaces";
import { GamePhaseContext } from "../../../context/game-phase-provider";
import { useContext } from "react";
import styles from './ButtonContainer.module.css';

interface ButtonContainerProps {
    resetGame: () => void;
    handleLottieStart: () => void;
}

function ButtonContainer({resetGame, handleLottieStart}: ButtonContainerProps) {
    const { currentPhase, setCurrentPhase } = useContext(GamePhaseContext);
    return (
        <div className={styles.buttonContainer}>
            <Button 
                onClick={resetGame}
            >
                Reset
            </Button>
             <Button 
                disabled={currentPhase === GamePhase.ONGOING}
                onClick={handleLottieStart}
            >
                Start
            </Button>
            <Button 
                disabled={currentPhase === GamePhase.START || currentPhase === GamePhase.PAUSE}
                onClick={() => setCurrentPhase(GamePhase.PAUSE)}
            >
                Pause
            </Button>
        </div>
    )
}

export default ButtonContainer;