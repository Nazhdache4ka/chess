import { useCallback, useEffect, useMemo, useState } from "react";

import { Grid, GridItem, Text } from "@chakra-ui/react"; 
import crypto from "crypto-js";

const ChessPieceType = {
  KING: "king",
  QUEEN: "queen",
  ROOK: "rook",
  BISHOP: "bishop",
  KNIGHT: "knight",
  PAWN: "pawn",
} as const;

type ChessPieceType = typeof ChessPieceType[keyof typeof ChessPieceType];

const ChessPieceTeam = {
  WHITE: "white",
  BLACK: "black",
} as const;

type ChessPieceTeam = typeof ChessPieceTeam[keyof typeof ChessPieceTeam];

type IChessPieceMovement = {
  row: number;
  column: number;
};

interface IChessPieceType {
  type: ChessPieceType;
  team: ChessPieceTeam;
}

interface IChessBoardElement {
  id: string;
  value: IChessPieceType | null;
}

const availableMovementsForChessPieceType: Record<ChessPieceType, IChessPieceMovement[]> = {
  [ChessPieceType.KING]: [
    { row: 1, column: 0 },
    { row: -1, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: -1 },
    { row: 1, column: 1 },
    { row: 1, column: -1 },
    { row: -1, column: 1 },
    { row: -1, column: -1 },
  ],
  [ChessPieceType.QUEEN]: [
    { row: 1, column: 0 },
    { row: -1, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: -1 },
    { row: 1, column: 1 },
    { row: 1, column: -1 },
    { row: -1, column: 1 },
    { row: -1, column: -1 },
  ],
  [ChessPieceType.ROOK]: [
    { row: 1, column: 0 },
    { row: -1, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: -1 },
  ],
  [ChessPieceType.BISHOP]: [
    { row: 1, column: 1 },
    { row: 1, column: -1 },
    { row: -1, column: 1 },
    { row: -1, column: -1 },
  ],
  [ChessPieceType.KNIGHT]: [
    { row: 2, column: 1 },
    { row: 2, column: -1 },
    { row: -2, column: 1 },
    { row: -2, column: -1 },
    { row: 1, column: 2 },
    { row: 1, column: -2 },
    { row: -1, column: 2 },
    { row: -1, column: -2 },
  ],
  [ChessPieceType.PAWN]: [
    { row: 1, column: 0 },
    { row: -1, column: 0 },
  ],
};

const initialElements: IChessBoardElement[][] = Array.from({ length: 8 }, () => {
  return Array.from({ length: 8 }, () => {
    return {
      id: crypto.SHA256(Math.random().toString()).toString(),
      value: null,
    };
  });
});

function getFillColor(indexRow: number, indexColumn: number) {
  return indexRow % 2 === 0 && indexColumn % 2 === 0
    ? "black"
    : indexRow % 2 === 1 && indexColumn % 2 === 1
      ? "black"
      : "white";
}

function fillChessBoard(elements: IChessBoardElement[][]) {
  const newElements = [...elements];

  newElements.forEach((row, indexRow) => {
    row.forEach((element, indexColumn) => {
      element.value = {
        type: Object.values(ChessPieceType)[
          Math.floor(Math.random() * Object.values(ChessPieceType).length)
        ] as ChessPieceType,
        team: indexRow % 2 === 0 && indexColumn % 2 === 0 ? ChessPieceTeam.WHITE : ChessPieceTeam.BLACK,
      };
    });
  });

  return newElements;
}

export function ChessBoardPage() {
  const [elements, setElements] = useState<IChessBoardElement[][]>(initialElements);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedElement = useMemo<IChessBoardElement | null>(
    () => elements.flat().find((element) => element.id === selectedId) ?? null,
    [elements, selectedId]
  );

  const availableMovements = useMemo<IChessPieceMovement[]>(() => {
    if (!selectedElement?.value?.type) {
      return [];
    }

    return availableMovementsForChessPieceType[selectedElement.value.type];
  }, [selectedElement]);

  const highlightedElements = useMemo<IChessPieceMovement[]>(() => {
    if (availableMovements.length === 0) {
      return [];
    }

    return availableMovements
      .map((movement) => {
        const highlightedElements: IChessPieceMovement[] = [];

        elements.forEach((row, rowIndex) =>
          row.forEach((element, columnIndex) => {
            if (element.id === selectedId) {
              highlightedElements.push({
                row: rowIndex + movement.row,
                column: columnIndex + movement.column,
              });
            }
          })
        );

        return highlightedElements;
      })
      .flat();
  }, [availableMovements, elements, selectedId]);

  const handleClick = useCallback(
    (indexRow: number, indexColumn: number) => {
      const element = elements[indexRow][indexColumn];

      if (!element.value) {
        throw new Error("Element is empty, how did you click on it?");
      }

      setSelectedId(element.id);
    },
    [elements]
  );

  useEffect(() => {
    setElements(fillChessBoard(elements));
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(8, 1fr)" templateRows="repeat(8, 1fr)" height="200px" width="200px">
        {elements.map((row, indexRow) => {
          return row.map((element, indexColumn) => {
            return (
              <GridItem
                key={`${indexRow}-${indexColumn}`}
                bg={getFillColor(indexRow, indexColumn)}
                border="1px solid black"
                height="full"
                width="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => handleClick(indexRow, indexColumn)}
                backgroundColor={
                  highlightedElements.some(
                    (highlightedElement) =>
                      highlightedElement.row === indexRow && highlightedElement.column === indexColumn
                  )
                    ? "red"
                    : undefined
                }
              >
                <Text
                  fontSize="12px"
                  fontWeight={700}
                  color={element.value?.team === ChessPieceTeam.WHITE ? "orange" : "blue"}
                >
                  {(
                    String(element.value?.type[0] ?? "") + String(element.value?.type[1] ?? "")
                  )?.toUpperCase()}
                </Text>
              </GridItem>
            );
          });
        })}
      </Grid>
    </>
  );
}
