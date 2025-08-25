import MyCell from '../MyCell/MyCell';
import styles from './MyBoard.module.css';
import { boardColor } from '../../utils/board-color';
import { type IChessBoardElement, type IChessPieceMovement, ChessPieceTeam } from '../../interfaces';
import { useHighlightedElements, useChessGame, useChessClickHandler } from '../../hooks';




export const MyBoard = () => {

    const {elements, selectedId, currentPlayer, isCheck, castleRights, isCheckmateState, setSelectedId, handleMove, resetGame} = useChessGame();
    const {highlightedElements, selectedElement} = useHighlightedElements(elements, selectedId, currentPlayer, castleRights, isCheck);
    const {handleClick} = useChessClickHandler(selectedId, currentPlayer, selectedElement, highlightedElements, isCheckmateState, setSelectedId, handleMove);
    
    return (
        <div>
            <div className={styles.gameInfo}>
                <h2>Ход: {currentPlayer === ChessPieceTeam.WHITE ? 'Белые' : 'Черные'}</h2>
                {isCheckmateState ? <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>Шах и мат!</h3> : isCheck && <h3 style={{color: 'red', margin: '10px 0', display: 'inline-block'}}>ШАХ!</h3>}
            </div>
            <button 
                onClick={() => {
                    resetGame();
                }}
                style = {{
                    backgroundColor: 'red',
                    color: 'white',
                    border: '1px solid white',
                    padding: '10px',
                    borderRadius: '5px',
                }}
            >
                Reset
            </button>
            <div className={styles.board}>
                {elements.map((row: IChessBoardElement[], indexRow: number) => {
                    return row.map((element: IChessBoardElement, indexColumn: number) => {
                        return <MyCell  
                            element={element}
                            style={{backgroundColor: boardColor(indexRow, indexColumn),
                                ...(highlightedElements.some((highlightedElement: IChessPieceMovement) => highlightedElement.row === indexRow && highlightedElement.column === indexColumn) ? {backgroundColor: 'red'} : {})
                            }} 
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