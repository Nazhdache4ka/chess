import MyCell from '../MyCell/MyCell';
import styles from './MyBoard.module.css';
import { useContext, useState } from 'react';
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { type IChessBoardElement, ChessPieceTeam, type ICastleRights } from '../../interfaces';
import { useHighlightedElements } from '../../hooks/use-highlighted-elements';
import { useChessClickHandler } from '../../hooks/use-chess-click-handler';
import { useSelectedElementCoordinates } from '../../hooks/use-selected-element-coordinates';
import { getChessPieceSymbol } from '../../utils/chess-piece-symbols';
import { GamePhaseContext } from '../../context/game-phase-provider';
import { GamePhase } from '../../context/context-interfaces';
import { getIdCoordinates } from '../../utils/getIdCoordinates';

interface MyBoardProps {
    elements: IChessBoardElement[][];
    selectedId: string | null;
    currentPlayer: ChessPieceTeam;
    isCheck: boolean;
    castleRights: ICastleRights;
    isCheckmateState: boolean;
    whiteTime: number;
    blackTime: number;
    setSelectedId: (id: string | null) => void;
    handleMove: (fromId: string, toId: string) => void;
}

function MyBoard({elements, selectedId, currentPlayer, isCheck, castleRights, isCheckmateState, whiteTime, blackTime, setSelectedId, handleMove}: MyBoardProps) {
    const {currentPhase} = useContext(GamePhaseContext);

    const {selectedElement, selectedElementRow, selectedElementColumn} = useSelectedElementCoordinates(elements, selectedId);
    const {highlightedElements} = useHighlightedElements(elements, selectedElement, selectedElementRow, selectedElementColumn, currentPlayer, castleRights, isCheck);
    const {handleClick} = useChessClickHandler(selectedId, currentPlayer, highlightedElements, isCheckmateState, whiteTime, blackTime, setSelectedId, handleMove);

    const [draggedPiece, setDraggedPiece] = useState<IChessBoardElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const sensors = useSensors(mouseSensor);

    const handleDragStart = (event: DragStartEvent) => {
        if (currentPhase === GamePhase.START || currentPhase === GamePhase.PAUSE) {
            return;
        }

        const draggedId = event.active.id as string;
        const draggedPiece = elements.flat().find((element) => element.id === draggedId);

        if (!draggedPiece) {
            return;
        }

        if (draggedPiece.value?.team === currentPlayer && whiteTime > 0 && blackTime > 0 && !isCheckmateState) {
            setSelectedId(draggedId);
            setDraggedPiece(draggedPiece);
            setIsDragging(true);
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {over, active} = event;

        setDraggedPiece(null);
        setIsDragging(false);

        if (!over) {
            setSelectedId(null);
            return;
        }

        const fromId = active.id as string;
        const toId = over.id as string;

        const targetPiece = elements.flat().find((element) => element.id === toId);

        if (!targetPiece) {
            return;
        }

        const isValid = highlightedElements.some((element) => 
            element.row === getIdCoordinates(toId).row &&
            element.column === getIdCoordinates(toId).column
        );

        if (isValid && fromId !== toId) {
            handleMove(fromId, toId);
        }

        setSelectedId(null);
    }

    const handleCellClick = (element: IChessBoardElement) => {
        if (isDragging) {
            return;
        }
        handleClick(element);
    }

    const handleDragCancel = () => {
        setDraggedPiece(null);
        setIsDragging(false);
    }
    
    return (
        <div>
            <DndContext 
                sensors={sensors}
                onDragStart={handleDragStart} 
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <div className={styles.board}>
                    {elements.map((row: IChessBoardElement[], indexRow: number) => {
                        return row.map((element: IChessBoardElement, indexColumn: number) => {
                            return <MyCell  
                                element={element}
                                highlightedElements={highlightedElements}
                                indexRow={indexRow}
                                indexColumn={indexColumn}
                                currentPlayer={currentPlayer}
                                onClick={() => handleCellClick(element)}
                                key={indexColumn} 
                            />
                        })
                    })} 
                </div>
                <DragOverlay>
                    {currentPhase === GamePhase.ONGOING && draggedPiece && (
                        <div 
                            style={{
                                fontSize: '48px',
                                cursor: 'grabbing',
                                opacity: 0.2,
                            }}
                        >
                            {getChessPieceSymbol(draggedPiece.value)}
                        </div>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
  );
};

export default MyBoard;