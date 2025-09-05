export const convertGameTimeWhite = (whiteTime: number) => {
    const minutesWhite = Math.floor((whiteTime % 3600) / 60);
    const secondsWhite = whiteTime % 60;
    return `${minutesWhite}:${secondsWhite.toString().padStart(2, '0')}`;
}

export const convertGameTimeBlack = (blackTime: number) => {
    const minutesBlack = Math.floor((blackTime % 3600) / 60);
    const secondsBlack = blackTime % 60;
    return `${minutesBlack}:${secondsBlack.toString().padStart(2, '0')}`;
}