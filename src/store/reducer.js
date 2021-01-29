import * as actionTypes from './actions';

const initialState = {
    sleepScore: "100",
    timeSettings: "Regular",
    dateSettings: "MDY",
    Times: [
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A"
        }
    ]
    /*sleepTime is an array filled with objects
    each object has an id key (which is given as the time which the data was entered)
    a sleeptime, and a wakeup time. The Times array only stores up to a week worths of data and slots in
    the latest date into the 0 index (and the last date in the 7th index assuming the array is full).
    */
};

const reducer = (state = initialState, action) => {
    
const leadingZeroHandler = (time) => {
    if(time < 10){
        time = "000" + time.toString()
    }
    else if(time < 100){
        time = "00" + time.toString()
    }
    else if(time < 1000){
        time = "0" + time.toString()
    }
    else{
        time = time.toString()
    }
    return time
}

const splittingTime = (time) => {
    return time.slice(0,2) + time.slice(3,5)
}

const militaryToRegularHandler = (time) => {
    let tempTimeValue = splittingTime(time)
    let AMorPM = "AM"

    tempTimeValue = parseInt(tempTimeValue)

    if(tempTimeValue >= 1200 && tempTimeValue <= 1259){
        AMorPM = "PM"
    }
    else if (tempTimeValue > 1259 && tempTimeValue < 2400){
        AMorPM = "PM"
        tempTimeValue -= 1200
    }
    else if (tempTimeValue >= 2400){
        tempTimeValue -= 1200
    }
    
    tempTimeValue = leadingZeroHandler(tempTimeValue)

    return (tempTimeValue.slice(0,2) + ":" + tempTimeValue.slice(2,4) + AMorPM)
}

const regularToMilitaryHandler = (time) => {
    let tempTimeValue = splittingTime(time)
    let AMorPM = time.slice(5,7);

    tempTimeValue = parseInt(tempTimeValue)

    if((AMorPM === "PM" && tempTimeValue < 1200)){
        tempTimeValue += 1200
    }
    else if ((AMorPM === "AM" && tempTimeValue >= 1200)){
        tempTimeValue -= 1200
    }
    tempTimeValue = leadingZeroHandler(tempTimeValue)
    
    return tempTimeValue.slice(0,2) + ":" + tempTimeValue.slice(2,4)
}

    if(action.type === "ADD"){
        const newTimes = [...state.Times];

        for (let i = 6; i >= 0; i--){
            if(i === 0){
                let sleepTime = action.value.sleepTime;
                let wakeTime = action.value.wakeTime;
                const id = action.id

                if(state.timeSettings === "Regular"){
                    const sleepAMorPM = action.value.button2;
                    const wakeAMorPM = action.value.button1;
                    sleepTime = sleepTime + sleepAMorPM;
                    wakeTime = wakeTime + wakeAMorPM;
                }

                newTimes[0] = {id, sleepTime, wakeTime}
            }
            else{
                newTimes[i] = {...newTimes[i-1]}
            }
        }
        return {
            ...state,
            Times: newTimes
        }
    }

    if(action.type === "CHANGE_SETTINGS"){
        if(action.timeOrDate === "Date"){
            return {
                ...state,
                dateSettings: action.value
            }
        }
        
        if(action.timeOrDate === "Time"){

            const newTimes = [...state.Times];

            for (let i = 0; i <= 6; i++){
                if(action.value === "Regular"){
                    if(newTimes[i].id !== "-1"){
                        newTimes[i] = {
                            ...newTimes[i], 
                            sleepTime: militaryToRegularHandler(newTimes[i].sleepTime), 
                            wakeTime: militaryToRegularHandler(newTimes[i].wakeTime)}
                    }
                    else{
                        break;
                    }
                }
                else if(action.value === "Military"){
                    if(newTimes[i].id !== "-1"){
                        newTimes[i] = {
                            ...newTimes[i], 
                            sleepTime: regularToMilitaryHandler(newTimes[i].sleepTime), 
                            wakeTime: regularToMilitaryHandler(newTimes[i].wakeTime)}
                    }
                    else{
                        break;
                    }
                }
            }
            return {
                ...state,
                Times: newTimes,
                timeSettings: action.value
            }
        }
    }
    return state;
};

export default reducer;