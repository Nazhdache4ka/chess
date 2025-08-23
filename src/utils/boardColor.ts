export const boardColor = (rowIndex: number, columnIndex: number) => {
    return (rowIndex + columnIndex) % 2 == 0 ? '#f0d9b5' : '#b58863';
}