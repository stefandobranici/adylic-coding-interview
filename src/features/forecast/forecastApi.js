import axios from "axios";
import { TRACKER_BASE_URL } from "../../utils/constants";

const api = axios.create({
    baseURL: `${TRACKER_BASE_URL}`
});

const splitForecastToDaysOfWeek = (forecast) => {
    let splitForecast = {};
    forecast.forEach(el => {
        const currentDay = new Date(el.dt).getDay();
        if (!(currentDay in splitForecast)) {
            splitForecast[currentDay] = [];
        }

        splitForecast[currentDay].push(el);
    });

    return splitForecast;
}

const toForecastData = (data) => {
    return {
        city: data.city.name,
        forecastData: splitForecastToDaysOfWeek(data.list.map(el => ({
            temp: el.main.temp,
            humidity: el.main.humidity,
            weather: {
                type: el.weather[0].main,
                description: el.weather[0].description,
            },
            dt: el.dt * 1000,
        })))
    }
}

export const getForecastData = async (city) => {
    return new Promise((resolve) => {
        api.get('/forecast', {
            params: {
                q: city,
                cnt: 40,
                units: 'metric',
                appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY
            }
        }).then(({ data }) => resolve({ data: toForecastData(data) }));
    })
}
