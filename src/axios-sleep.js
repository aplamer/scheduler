import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sleep-scheduler-4c01c-default-rtdb.firebaseio.com/'
});

export default instance;