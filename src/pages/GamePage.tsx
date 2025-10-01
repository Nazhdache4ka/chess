import ButtonContainer from "../components/Button/ButtonContainer/ButtonContainer";
import MyBoard from "../components/MyBoard/MyBoard";
import GameInfo from "../components/GameInfo/GameInfo";
import Modal from "../components/Modal/Modal";
import { LottieComponent } from "../components/Lottie/Lottie";
import { useChessGame } from "../hooks/use-chess-game";
import { useContext, useState } from "react";
import { GamePhaseContext } from "../context/game-phase-provider";
import { GamePhase } from "../context/context-interfaces";

function GamePage() {
    const [isShowLottie, setIsShowLottie] = useState(false);
    const { setCurrentPhase } = useContext(GamePhaseContext);
    const {whiteTime, blackTime, resetGame, currentPlayer, isCheckmateState, isCheck, elements, selectedId, castleRights, modalVisible, setSelectedId, handleMove, onPieceSelect} = useChessGame();

    const handleLottieStart = () => {
        setIsShowLottie(true);
    }

    const handleLottieComplete = () => {
        setCurrentPhase(GamePhase.ONGOING);
        setIsShowLottie(false);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '100px'}}>
            <LottieComponent onComplete={handleLottieComplete} isShow={isShowLottie}/>
            <ButtonContainer resetGame={resetGame} handleLottieStart={handleLottieStart}/>
            <Modal modalVisible={modalVisible} onPieceSelect={onPieceSelect}/>
            <MyBoard 
                elements={elements}
                selectedId={selectedId}
                currentPlayer={currentPlayer}
                isCheck={isCheck}
                castleRights={castleRights}
                isCheckmateState={isCheckmateState}
                whiteTime={whiteTime} 
                blackTime={blackTime}
                setSelectedId={setSelectedId}
                handleMove={handleMove}
            />
            <GameInfo 
                currentPlayer={currentPlayer} 
                isCheckmateState={isCheckmateState} 
                isCheck={isCheck} 
                whiteTime={whiteTime} 
                blackTime={blackTime}
            />
        </div>
    )
}

export default GamePage;