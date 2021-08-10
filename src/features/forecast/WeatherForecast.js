import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { selectStatus, selectTargetCity, selectForecastData } from './forecastSlice';
import StatisticsPanel from '../statisticsPanel/StatisticsPanel';
import { buildTracker, updateTracker } from '../tracker/Tracker';
import { DAY_TRACKER, NIGHT_TRACKER, HUMIDITY_TRACKER } from '../../utils/constants';
import { orderDaysOfWeek } from '../../utils/timeUtil';

import './WeatherForecast.css';

export default function WeatherForecast() {
    const status = useSelector(selectStatus);
    const targetCity = useSelector(selectTargetCity);
    const forecastData = useSelector(selectForecastData);

    /* Obtain all available days in the forecast data by retrieving the keys */
    const availableDays = forecastData && orderDaysOfWeek(Object.keys(forecastData));

    if (status === 'loading') {
        return (<div> <Spinner animation="border" className="loading-spinner" id="loading-spinner" /></div>);
    }

    return (
        <Row className="justify-content-md-center">
            {availableDays.map(day => {
                const currentForecastData = forecastData[day];

                const dayTempTracker = updateTracker(buildTracker(DAY_TRACKER), currentForecastData);
                const nightTempTracker = updateTracker(buildTracker(NIGHT_TRACKER), currentForecastData);
                const humidityTracker = updateTracker(buildTracker(HUMIDITY_TRACKER), currentForecastData);

                const currentDay = new Date(currentForecastData[0].dt).toDateString();

                return (
                    <Col sm="12" md="6" lg="4" style={{ paddingTop: '30px' }} key={`statistics-panel-${day}`} id={`statistics-panel-${day}`}>
                        <StatisticsPanel activeDay={currentDay} city={targetCity} trackers={{ dayTempTracker, nightTempTracker, humidityTracker }} />
                    </Col>
                );
            })}
        </Row>
    );
}