import * as actionTypes from './actions';

const initialState = {
    sleepScore: "100",
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
    return state;
};

export default reducer;