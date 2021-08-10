import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from '../features/tracker/trackerSlice';
import forecastReducer from '../features/forecast/forecastSlice';

export const store = configureStore({
  reducer: {
    tracker: trackerReducer,
    forecast: forecastReducer,
  },
});
