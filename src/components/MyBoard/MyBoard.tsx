import MyCell from '../MyCell/MyCell';
import styles from './MyBoard.module.css';
import Button from '../Button/Button';
import { type IChessBoardElement, ChessPieceTeam } from '../../interfaces';
import { useChessGame } from '../../hooks/use-chess-game';
import { useHighlightedElements } from '../../hooks/use-highlighted-elements';
import { useChessClickHandler } from '../../hooks/use-chess-click-handler';
import { useSelectedElementCoordinates } from '../../hooks/use-selected-element-coordinates';
import Timer from '../Timer/Timer';

function MyBoard() {
    const {elements, selectedId, currentPlayer, isCheck, castleRights, isCheckmateState, whiteTime, blackTime, setSelectedId, handleMove, resetGame} = useChessGame();
    const {selectedElement, selectedElementRow, selectedElementColumn} = useSelectedElementCoordinates(elements, selectedId);
    const {highlightedElements} = useHighlightedElements(elements, selectedElement, selectedElementRow, selectedElementColumn, currentPlayer, castleRights, isCheck);
    const {handleClick} = useChessClickHandler(selectedId, currentPlayer, selectedElement, highlightedElements, isCheckmateState, setSelectedId, handleMove);
    
    return (
        <div>
            <div className={styles.gameInfo}>
                <h2>Ход: {currentPlayer === ChessPieceTeam.WHITE ? 'Белые' : 'Черные'}</h2>
                {isCheckmateState ? <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>Шах и мат!</h3> : isCheck && <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>ШАХ!</h3>}
                {whiteTime === 0 && <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>Время белых истекло!</h3>}
                {blackTime === 0 && <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>Время черных истекло!</h3>}
            </div>
            <Button 
                onClick={resetGame}
            >
                Reset
            </Button>
            {/* todo: remove Timer and Button from here to GamePage*/}
            <Timer whiteTime={whiteTime} blackTime={blackTime}/>
            <div className={styles.board}>
                {elements.map((row: IChessBoardElement[], indexRow: number) => {
                    return row.map((element: IChessBoardElement, indexColumn: number) => {
                        return <MyCell  
                            element={element}
                            highlightedElements={highlightedElements}
                            indexRow={indexRow}
                            indexColumn={indexColumn}
                            onClick={() => handleClick(element)}
                            key={indexColumn} 
                        />
                    })
                })} 
            </div>
        </div>
  );
};

export default MyBoard;