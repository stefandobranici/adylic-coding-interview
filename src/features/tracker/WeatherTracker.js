import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { retrieveTrackerData, selectStatus, selectTrackerData, selectTrackedCity } from './trackerSlice';
import StatisticsPanel from '../statisticsPanel/StatisticsPanel';
import { buildTracker, updateTracker } from './Tracker';
import { DAY_TRACKER, NIGHT_TRACKER, HUMIDITY_TRACKER } from '../../utils/constants';

import './WeatherTracker.css';

export default function WeatherTracker() {
    const dispatch = useDispatch();

    const status = useSelector(selectStatus);
    const trackedCity = useSelector(selectTrackedCity);
    const trackerData = useSelector(selectTrackerData);

    const dayTempTracker = updateTracker(buildTracker(DAY_TRACKER), trackerData);
    const nightTempTracker = updateTracker(buildTracker(NIGHT_TRACKER), trackerData);
    const humidityTracker = updateTracker(buildTracker(HUMIDITY_TRACKER), trackerData);

    const activeDay = new Date().toDateString();

    /* Poll for new weather data every 60 seconds */
    useEffect(() => {
        const timer = setTimeout(
            () => dispatch(retrieveTrackerData({ city: trackedCity })),
            60000
        );
        return () => clearTimeout(timer);
    });

    /* Indicate that new data is being appended by displaying a loading animation */
    if (status === 'loading') {
        return (<div> <Spinner animation="border" className="loading-spinner" id="loading-spinner" /></div>);
    }

    return (
        <Row className="justify-content-md-center">
            <Col md="6" lg="4" style={{ paddingTop: '30px' }}>
                <StatisticsPanel activeDay={activeDay} city={trackedCity} trackers={{ dayTempTracker, nightTempTracker, humidityTracker }} />
            </Col>
        </Row>
    );
}
