export const getIdCoordinates = (id: string) => {
    const row = parseInt(id.split('-')[0]);
    const column = parseInt(id.split('-')[1]);
    return { row, column };
}