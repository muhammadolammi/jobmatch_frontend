import axios from "axios";

// console.log(process.env.REACT_APP_BASE_URL)
export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/api",
    withCredentials: false,
    headers: {
        "client-api-key": process.env.REACT_APP_API_KEY
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
