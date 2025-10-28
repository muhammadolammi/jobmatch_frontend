import axios from "axios";

// console.log(process.env.REACT_APP_BASE_URL)
export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/api",
    withCredentials: false,
    headers: {
        "Authorization": process.env.REACT_APP_API_KEY
    },
});