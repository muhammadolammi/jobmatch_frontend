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
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthRoute =
            originalRequest.url.includes("/login") ||
            originalRequest.url.includes("/refresh");

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isAuthRoute
        ) {
            originalRequest._retry = true;

            try {
                const res = await api.post("/refresh");
                const newToken = res.data.access_token;

                localStorage.setItem("access_token", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // 🚫 Do NOT hard reload
                localStorage.removeItem("access_token");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

