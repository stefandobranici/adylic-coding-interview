/*
    Identify if the dateTime of a value entry is for day or for night time
*/
export const isDayTime = (dateTime) => {
    const hours = new Date(dateTime).getHours();
    return hours > 6 && hours < 20;
}

export const isNightTime = (dateTime) => {
    const hours = new Date(dateTime).getHours();
    return hours > 20 || hours < 6;
}

/* 
    Forecast returns days in a sorted order
    To display the current day as the first element on screen, we have to reorder the list
*/
export const orderDaysOfWeek = (days) => {
    if (!days) {
        return null;
    }
    const today = new Date().getDay();
    const fromTodayToEndOfWeek = days.filter(day => day >= today);

    return fromTodayToEndOfWeek.concat(days.splice(0, days.length - fromTodayToEndOfWeek.length));
}