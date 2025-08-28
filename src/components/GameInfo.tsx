import { ChessPieceTeam } from "../interfaces";

interface GameInfoProps {
    currentPlayer: ChessPieceTeam;
    isCheckmateState: boolean;
    isCheck: boolean;
    whiteTime: number;
    blackTime: number;
}

function GameInfo({currentPlayer, isCheckmateState, isCheck, whiteTime, blackTime}: GameInfoProps) {
    return (
        <div>
            <h2>Ход: {currentPlayer === ChessPieceTeam.WHITE ? 'Белые' : 'Черные'}</h2>
            {isCheckmateState ? <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>Шах и мат!</h3> : isCheck && <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>ШАХ!</h3>}
            {whiteTime === 0 && <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>Время белых истекло!</h3>}
            {blackTime === 0 && <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>Время черных истекло!</h3>}
        </div>
    )
}

export default GameInfo;