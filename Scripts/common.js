function isBetween(value, start, end) {
    return value >= start && value <= end;
}

function getSceneTime() {
    const BLANK_TIME = new Date(new Date().setTime(0, 0, 0, 0));
    const DAY = BLANK_TIME.setDate(2) - BLANK_TIME.setDate(1);

    let sceneTime = (sunAngle * DAY) / 360;


    let dateTime = new Date(BLANK_TIME.setTime(sceneTime));
    return new Date(dateTime.setHours(dateTime.getHours() - 9));
}

function getStringTime(dateTime, isMilitaryTime) {
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

    if (isMilitaryTime) {
        return hours + ":" + minutes;
    }
    else {
        return (hours > 12 ? hours - 12 : hours) + ":" + minutes + (hours >= 12 ? "pm" : "am");
    }
}