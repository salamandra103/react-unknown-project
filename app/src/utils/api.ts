import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL,
    responseType: 'json',
    // headers: {
    //     'Authorization': '2312'
    // }
});

api.interceptors.request.use((config) => {
    const _config = config;
    if (localStorage.getItem("user_info")) {
        _config.headers.Authorization = JSON.parse(localStorage.getItem("user_info") || '{}').accessToken;
    } else {
        _config.headers.Authorization = '';
    }
    return _config;
}, (error) => {
    return Promise.reject(error)
})


api.interceptors.response.use((response) => response, (error) => {
    if (error.response.data.message === "Access token expired") {
        return api.post("auth/token", {
            id: localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info") || '{}').id : "",
        }).then((res) => {
            localStorage.setItem("user_info", JSON.stringify(res.data));
            return api.request(error.config);
        });
    }
    if (error.response.data.message === "Refresh token expired") {
        localStorage.removeItem("user_info");
    }
    return Promise.reject(error);
});

export default api;