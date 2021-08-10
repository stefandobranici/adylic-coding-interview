import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getForecastData } from './forecastApi';


const initialState = {
    status: 'idle',
    targetCity: null,
    forecastData: null,
};

export const retrieveForecastData = createAsyncThunk(
    'forecast/retrieveForecastData',
    async ({ city }) => {
        const response = await getForecastData(city);
        return response.data;
    }
);


export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(retrieveForecastData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(retrieveForecastData.fulfilled, (state, action) => {
                const { city, forecastData } = action.payload;

                state.status = 'idle';
                state.targetCity = city;
                state.forecastData = forecastData;
            });
    },
});

export const selectStatus = (state) => state.forecast.status;
export const selectTargetCity = (state) => state.forecast.targetCity;
export const selectForecastData = (state) => state.forecast.forecastData;

export default forecastSlice.reducer;
