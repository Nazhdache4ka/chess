export const boardColor = (rowIndex: number, columnIndex: number) => {
    return (rowIndex + columnIndex) % 2 == 0 ? true : false;
}