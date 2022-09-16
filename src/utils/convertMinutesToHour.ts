function convertMinutesToHour(minutesAmount:number){
    const dividedMinutes = Math.floor(minutesAmount/60);
    const minutes = minutesAmount % 60;

    if(minutes === 0){
        return `${dividedMinutes}:${minutes}0`
    }else if(minutes < 10){
        return `${dividedMinutes}:0${minutes}`
    }

    return `${dividedMinutes}:${minutes}`
}

export default convertMinutesToHour