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

api.interceptors.response.use(
    (response) => response, // just return successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            // 🔒 Token expired or unauthorized → redirect to login
            localStorage.removeItem("access_token"); // optional: clear token
            window.location.href = "/login"; // adjust path if your login route differs
        }

        return Promise.reject(error);
    }
);