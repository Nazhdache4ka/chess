import Button from "../components/Button/Button";
import MyBoard from "../components/MyBoard/MyBoard";
import GameInfo from "../components/GameInfo/GameInfo";
import { useChessGame } from "../hooks/use-chess-game";

function GamePage() {
    const {whiteTime, blackTime, resetGame, currentPlayer, isCheckmateState, isCheck, elements, selectedId, castleRights, setSelectedId, handleMove} = useChessGame();

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '100px'}}>
            <Button 
                onClick={resetGame}
            >
                Reset
            </Button>
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