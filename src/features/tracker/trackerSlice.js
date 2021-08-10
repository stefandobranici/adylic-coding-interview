import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTrackerData } from './trackerApi';


const initialState = {
    status: 'idle',
    trackerData: null,
    trackedCity: null,
};

export const retrieveTrackerData = createAsyncThunk(
    'tracker/retrieveTrackerData',
    async ({ city }) => {
        const response = await getTrackerData(city);
        return response.data;
    }
);


export const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTrackerData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(retrieveTrackerData.fulfilled, (state, action) => {
                const { city, trackedData } = action.payload;

                /* When new city is tracked, reset tracked data and set new tracked city */
                if (state.trackedCity !== city) {
                    state.trackedCity = city;
                    state.trackerData = [];
                }

                state.status = 'idle';
                /* Add new data to previous data */
                state.trackerData = state.trackerData.concat(trackedData);
            });
    },
});

export const selectStatus = (state) => state.tracker.status;
export const selectTrackerData = (state) => state.tracker.trackerData;
export const selectTrackedCity = (state) => state.tracker.trackedCity;

export default trackerSlice.reducer;
