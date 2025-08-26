import { useMemo } from "react";
import type { IChessBoardElement } from "../interfaces";

export const useSelectedElementCoordinates = (elements: IChessBoardElement[][], selectedId: string | null): {
    selectedElement: IChessBoardElement | null,
    selectedElementRow: number,
    selectedElementColumn: number
} => {

    const selectedElement: IChessBoardElement | null = useMemo(
        () => elements.flat().find((element) => element.id === selectedId) ?? null,
        [elements, selectedId]
    );

    let selectedElementRow = -1;
    let selectedElementColumn = -1;

      for (let i = 0; i < elements.length; i++) {
          for (let j = 0; j < elements[i].length; j++) {
              if (elements[i][j].id === selectedId) {
                  selectedElementRow = i;
                  selectedElementColumn = j;
                  break;
              }
          }
          if (selectedElementRow !== -1) break;
      }

      if (selectedElementRow === -1) {
          return {
            selectedElement: null,
            selectedElementRow: -1,
            selectedElementColumn: -1
          };
      }

    return {
        selectedElement,
        selectedElementRow,
        selectedElementColumn
    };
}