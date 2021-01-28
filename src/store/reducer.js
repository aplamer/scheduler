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
    
const militaryToRegularHandler = (time) => {
    let tempTimeValue = time.slice(0,2) + time.slice(3,5)
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
    
    if(tempTimeValue < 1000){
        tempTimeValue = "0" + tempTimeValue.toString()
    }
    else{
        tempTimeValue = tempTimeValue.toString()
    }

    return (tempTimeValue.slice(0,2) + ":" + tempTimeValue.slice(2,4) + AMorPM)
}

const regularToMilitaryHandler = (time) => {
    let tempTimeValue = time.slice(0,2) + time.slice(3,5)
    let AMorPM = time.slice(5,7);

    tempTimeValue = parseInt(tempTimeValue)

    if((AMorPM === "PM" && tempTimeValue < 1200) || (AMorPM === "AM" && tempTimeValue >= 1200)){
        tempTimeValue += 1200
    }
    
    if(tempTimeValue < 1000){
        tempTimeValue = "0" + tempTimeValue.toString()
    }
    else{
        tempTimeValue = tempTimeValue.toString()
    }
    
    return tempTimeValue.slice(0,2) + ":" + tempTimeValue.slice(2,4)
}

    if(action.type === "ADD"){
        const newTimes = [...state.Times];

        for (let i = 6; i >= 0; i--){
            if(i === 0){
                const sleepTime = action.value.sleepTime;
                const wakeTime = action.value.wakeTime;
                const id = action.id
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
                        newTimes[i].sleepTime = militaryToRegularHandler(newTimes[i].sleepTime);
                        newTimes[i].wakeTime = militaryToRegularHandler(newTimes[i].wakeTime);
                    }
                    else{
                        break;
                    }
                }
                else if(action.value === "Military"){
                    if(newTimes[i].id !== "-1"){
                        newTimes[i].sleepTime = regularToMilitaryHandler(newTimes[i].sleepTime);
                        newTimes[i].wakeTime = regularToMilitaryHandler(newTimes[i].wakeTime);
                    }
                    else{
                        break;
                    }
                }
            }
            console.log(state);
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