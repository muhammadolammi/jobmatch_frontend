import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/client";
import type { RootState } from "../app/store";


// --- TYPES ---
interface User {
    id?: string;
    email?: string;
    role?: "employer" | "job_seeker" | "admin" | null;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// --- INITIAL STATE ---
const initialState: AuthState = {
    user: null,
    accessToken: localStorage.getItem("access_token"),
    isAuthenticated: !!localStorage.getItem("access_token"),
    loading: false,
    error: null,
};

// --- ASYNC THUNKS ---

// REGISTER
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (payload: any, { rejectWithValue }) => {
        try {
            const res = await api.post("/register", payload);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || "Registration failed");
        }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await api.post("/login", credentials);
            const data = res.data;
            // Save token locally
            localStorage.setItem("access_token", data.access_token);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || "Invalid credentials");
        }
    }
);

// REFRESH TOKEN
export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.post("/refresh");
            const data = res.data;
            localStorage.setItem("access_token", data.access_token);
            return data;
        } catch (err: any) {
            return rejectWithValue("Failed to refresh token. Please login again.");
        }
    }
);

// FETCH CURRENT USER
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("No token found");
            const res = await api.get("/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err: any) {
            localStorage.removeItem("access_token");
            // // Redirect immediately to login if invalid session
            return rejectWithValue("Unable to validate user session");
        }
    }
);

// --- SLICE ---
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("access_token");
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        // LOGIN
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.access_token;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.user = null;
            state.isAuthenticated = false;
            state.accessToken = null;
        });

        // REGISTER
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // FETCH USER
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // REFRESH TOKEN
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.access_token;
            localStorage.setItem("access_token", action.payload.access_token);
        });
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload as string;
            localStorage.removeItem("access_token");
        });
    },
});

export const { logout, setUser } = authSlice.actions;

// --- SELECTORS ---
export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
