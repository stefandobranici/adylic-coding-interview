import axios from "axios";
import { TRACKER_BASE_URL } from '../../utils/constants';

const api = axios.create({
    baseURL: `${TRACKER_BASE_URL}`
});

const toTrackerData = (data) => {
    return {
        city: data.city.name,
        trackedData:
            data.list.map(el => ({
                temp: el.main.temp,
                humidity: el.main.humidity,
                dt: el.dt * 1000,
            }))
    };
}

export const getTrackerData = async (city) => {
    return new Promise((resolve) => {
        api.get('/forecast', {
            params: {
                q: city,
                cnt: 5,
                units: 'metric',
                appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY
            }
        }).then(({ data }) => resolve({ data: toTrackerData(data) }));
    })
}