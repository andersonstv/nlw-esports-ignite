
export function convertMinutesToHourString(minutesTotal: number){
    const hours = Math.floor(minutesTotal/60);
    const minutes = minutesTotal % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}