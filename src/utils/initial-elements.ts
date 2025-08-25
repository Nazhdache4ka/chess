import { type IChessBoardElement } from "../interfaces";

export const initialElements: IChessBoardElement[][] = Array.from({length: 8}, (_, rowIndex) => {
    return Array.from({length: 8}, (_, columnIndex) => {
        return {
            id: `${rowIndex}-${columnIndex}`,
            value: null,
        }
    })
})