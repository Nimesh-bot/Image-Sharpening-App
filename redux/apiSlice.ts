import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppAxios } from '../config/axios.config';

export interface Result {
    message: string;
    sharpened_path: string;
}
interface ApiSlice {
    results: Result[];
    loading: boolean;
    error: string | null;
}

const initialState: ApiSlice = {
    results: [],
    loading: false,
    error: null,
};

// ------------------------- GET -------------------------
export const getResults = createAsyncThunk<Result[]>("api/getResults", async () => {
    const response = await AppAxios.get('/results');
    return response.data.results;
});

// -------------------------- SLICE --------------------------
const apiSlice = createSlice({
    name: "api",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getResults.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getResults.fulfilled, (state, action) => {
            state.loading = false;
            state.results = action.payload;
            state.error = null;
        });
        builder.addCase(getResults.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    }
});

export default apiSlice.reducer;