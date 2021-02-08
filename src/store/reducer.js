
import { std} from 'mathjs'
import axios from 'axios'
const initialState = {
    sleepScore: "N/A",
    timeSettings: "Regular",
    dateSettings: "MDY",
    Times: [
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A",
            totalHours: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A",
            totalHours: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A",
            totalHours: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A",
            totalHours: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A",
            totalHours: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A",
            totalHours: "N/A"
        },
        {
            id: "-1",
            sleepTime: "N/A",
            wakeTime: "N/A",
            totalHours: "N/A"
        }
    ]
    /*sleepTime is an array filled with objects
    each object has an id key (which is given as the time which the data was entered)
    a sleeptime, and a wakeup time. The Times array only stores up to a week worths of data and slots in
    the latest date into the 0 index (and the last date in the 7th index assuming the array is full).
    */
   ,
   token: null,
   userId: null,
   error: null,
   dataId: null
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
    else if (tempTimeValue >= 0 && tempTimeValue < 100){
        tempTimeValue += 1200
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


const timeToNumberHelper = time => {
    let retTime = null
    if(state.timeSettings === "Regular"){
        retTime = regularToMilitaryHandler(time)
        retTime = splittingTime(retTime)
        retTime = parseInt(retTime)
    }
    else{
        retTime = time
        retTime = splittingTime(retTime)
        retTime = parseInt(retTime)
    }
    return retTime;
}

const stdScorer = std => {
    if(std < 1){
        return 20
    }
    else if (std < 2){
        return 10
    }
    else if (std < 3){
        return 5
    }
    else{
        return 0
    }
}

const average = scores => {
    if(scores.length > 0){
        
        let totalScore = 0 
        for(let i = 0; i < scores.length; i++){
            totalScore += scores[i];
        }
        return totalScore/scores.length
    }

    else{
        return 0
    }
}

const totalHoursHelper = (sleepTime, wakeTime) => {
    let totalSleepHours = (sleepTime - wakeTime)/100;
        
        if(sleepTime >= wakeTime){
            totalSleepHours = 24 - totalSleepHours
        }
        else{
            totalSleepHours = totalSleepHours * -1
        }

        return totalSleepHours
}

const sleepHoursTotalAvg = newTimes => {
    let tempNewTimes = [...newTimes]
    let scores = []
    for (let i = 0; i <= 6; i++){
        if(tempNewTimes[i].id === "-1"){
            break
        }
        let tempSleepTimeValue = timeToNumberHelper(tempNewTimes[i].sleepTime)
        let tempWakeTimeValue = timeToNumberHelper(tempNewTimes[i].wakeTime)

        let totalSleepHours = totalHoursHelper(tempSleepTimeValue, tempWakeTimeValue)
        if(totalSleepHours >= 7 && totalSleepHours <= 9){
            scores.push(40)
        }
        else if ((totalSleepHours >= 5 && totalSleepHours < 7) || (totalSleepHours > 9 && totalSleepHours <= 11) ){
            scores.push(20)
        }
        else if ((totalSleepHours >= 3 && totalSleepHours < 5) || (totalSleepHours > 11 && totalSleepHours <= 13) ){
            scores.push(0)
        }
        else {
            scores.push(-40)
        }

    }
    
    return average(scores)

}

const sleepHoursConsistentAvg = newTimes => {
    let tempNewTimes = [...newTimes]
    let scores = []
    let sleepTimes = []
    let wakeTimes = []
    for (let i = 0; i <= 6; i++){
        if(tempNewTimes[i].id === "-1"){
            break
        }
        let tempSleepTimeValue = timeToNumberHelper(tempNewTimes[i].sleepTime)
        let tempWakeTimeValue = timeToNumberHelper(tempNewTimes[i].wakeTime)

        sleepTimes.push(tempSleepTimeValue/100)
        wakeTimes.push(tempWakeTimeValue/100)
        scores.push(stdScorer(std(sleepTimes)) + stdScorer(std(wakeTimes)))
    }
    return average(scores)

}
const sleepTimeAvg = newTimes => {
    let tempNewTimes = [...newTimes]
    let scores = []
    let sleepHours = []
    for (let i = 0; i <= 6; i++){
        if(tempNewTimes[i].id === "-1"){
            break
        }
        let tempSleepTimeValue = timeToNumberHelper(tempNewTimes[i].sleepTime)
        let tempWakeTimeValue = timeToNumberHelper(tempNewTimes[i].wakeTime)

        let totalSleepHours = totalHoursHelper(tempSleepTimeValue, tempWakeTimeValue)

        sleepHours.push(totalSleepHours)
        scores.push(stdScorer(std(sleepHours)))
    }

    return average(scores)

}

const synchState = (newState) => {
    axios.put('https://sleep-scheduler-4c01c-default-rtdb.firebaseio.com/data/' + state.dataId + '.json?auth=' + state.token, newState)
}

switch(action.type){
    case "ADD":
        const newTimes = [...state.Times];

        for (let i = 6; i >= 0; i--){
            if(i === 0){
                let sleepTime = action.value.sleepTime;
                let wakeTime = action.value.wakeTime;
                const id = action.id

                if(state.timeSettings === "Regular"){
                    const sleepAMorPM = action.value.button1;
                    const wakeAMorPM = action.value.button2;
                    sleepTime = sleepTime + sleepAMorPM;
                    wakeTime = wakeTime + wakeAMorPM;
                }
                const totalHoursValue = totalHoursHelper(timeToNumberHelper(sleepTime), timeToNumberHelper(wakeTime)).toString()
                
                newTimes[0] = {id: id, sleepTime: sleepTime, wakeTime: wakeTime, totalHours: totalHoursValue}
                
            }
            else{
                newTimes[i] = {...newTimes[i-1]}
            }
        }

        
        // console.log(sleepHoursTotalAvg(newTimes), sleepHoursConsistentAvg(newTimes), sleepTimeAvg(newTimes))
        if(state.token){
            const newState = {
                ...state,
                sleepScore: (sleepHoursTotalAvg(newTimes) + sleepHoursConsistentAvg(newTimes) + sleepTimeAvg(newTimes)).toFixed(2).toString(),
                Times: newTimes
            }
            synchState(newState)
        }
        return {
            ...state,
            sleepScore: (sleepHoursTotalAvg(newTimes) + sleepHoursConsistentAvg(newTimes) + sleepTimeAvg(newTimes)).toFixed(2).toString(),
            Times: newTimes
        }
    
    case "CHANGE_SETTINGS":
        if(action.timeOrDate === "Date"){
            if(state.token){
                const newState = {
                    ...state,
                    dateSettings: action.value
                }
                synchState(newState)
            }
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
            if(state.token){
                const newState = {
                    ...state,
                    Times: newTimes,
                    timeSettings: action.value
                }
                synchState(newState)
            }
            return {
                ...state,
                Times: newTimes,
                timeSettings: action.value
            }
        }
    
    // eslint-disable-next-line
    case "AUTH_FAIL":
        return {
            ...state,
            error: action.error.response.data.error
        }

    case "AUTH_SIGNUP":
        const newState = {
            ...action.response
        }
        return newState
    
    case "AUTH_LOGIN":
        return{
            ...action.response.data[Object.keys(action.response.data)[0]],
            token: action.token
        }
         

    case "LOGOUT":
        return {
            ...initialState
        }
    default:
        return state
}

};

export default reducer;