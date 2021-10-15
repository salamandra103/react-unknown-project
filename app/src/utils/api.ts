import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL,
    responseType: 'json',
    // headers: {
    //     'Authorization': '2312'
    // }
});

export default api;