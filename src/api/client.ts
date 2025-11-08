import axios from "axios";
export const API_BASE_URL = process.env.REACT_APP_BASE_URL + "/api";
export const API_KEY = process.env.REACT_APP_API_KEY

// console.log(process.env.REACT_APP_BASE_URL)
export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
        "client-api-key": API_KEY
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response, // just return successful responses
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // 🔒 Token expired or unauthorized → redirect to login
            originalRequest._retry = true;
            // localStorage.removeItem("access_token");
            // window.location.href = "/login";
            try {
                const res = await api.post("/refresh"); // refresh token endpoint
                const newToken = res.data.access_token;
                localStorage.setItem("access_token", newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest); // retry original request
            } catch (err) {
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);