import MyCell from '../MyCell/MyCell';
import styles from './MyBoard.module.css';
import { type IChessBoardElement, ChessPieceTeam, type ICastleRights } from '../../interfaces';
import { useHighlightedElements } from '../../hooks/use-highlighted-elements';
import { useChessClickHandler } from '../../hooks/use-chess-click-handler';
import { useSelectedElementCoordinates } from '../../hooks/use-selected-element-coordinates';

interface MyBoardProps {
    elements: IChessBoardElement[][];
    selectedId: string | null;
    currentPlayer: ChessPieceTeam;
    isCheck: boolean;
    castleRights: ICastleRights;
    isCheckmateState: boolean;
    setSelectedId: (id: string | null) => void;
    handleMove: (fromId: string, toId: string) => void;
}

function MyBoard({elements, selectedId, currentPlayer, isCheck, castleRights, isCheckmateState, setSelectedId, handleMove}: MyBoardProps) {
    const {selectedElement, selectedElementRow, selectedElementColumn} = useSelectedElementCoordinates(elements, selectedId);
    const {highlightedElements} = useHighlightedElements(elements, selectedElement, selectedElementRow, selectedElementColumn, currentPlayer, castleRights, isCheck);
    const {handleClick} = useChessClickHandler(selectedId, currentPlayer, selectedElement, highlightedElements, isCheckmateState, setSelectedId, handleMove);
    
    
    return (
        <div>
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