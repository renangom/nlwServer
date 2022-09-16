function convertHourStringToMinutes(hourString: string){
    let array = hourString.split(":");
    const minutes = Number(array[0])*60 + Number(array[1])

    return minutes
}

export default convertHourStringToMinutes;