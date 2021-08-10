import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { retrieveTrackerData } from './features/tracker/trackerSlice';
import { retrieveForecastData } from './features/forecast/forecastSlice';
import WeatherTracker from './features/tracker/WeatherTracker';
import WeatherForecast from './features/forecast/WeatherForecast';
import { DISPLAY_COMPONENT_NONE, DISPLAY_COMPONENT_TRACKER, DISPALY_COMPONENT_FORECAST } from './utils/constants';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const [targetCity, setTargetCity] = useState(null);
  const [displayComponent, setDisplayComponent] = useState(DISPLAY_COMPONENT_NONE);

  return (
    <React.Fragment>
      <div className="App">
        <Container>
          <Row className="justify-content-md-center">
            <Col md lg="6">
              <h1>Weather Tracker</h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center search-bar">
            <Col md lg="6">
              <InputGroup className="mb-2">
                <FormControl
                  placeholder="City"
                  aria-label="Filter City"
                  onChange={e => setTargetCity(e.target.value)}
                />
                <Button
                  variant="primary"
                  id="tracker-btn"
                  onClick={() => targetCity && (dispatch(retrieveTrackerData({ city: targetCity })) && setDisplayComponent(DISPLAY_COMPONENT_TRACKER))}>
                  Track
                </Button>
                <Button
                  variant="info"
                  id="forecast-btn"
                  onClick={() => targetCity && (dispatch(retrieveForecastData({ city: targetCity })) && setDisplayComponent(DISPALY_COMPONENT_FORECAST))}>
                  Forecast
                </Button>
              </InputGroup>
            </Col>
          </Row>
          {displayComponent === DISPLAY_COMPONENT_TRACKER && <WeatherTracker id='weather-tracker' />}
          {displayComponent === DISPALY_COMPONENT_FORECAST && <WeatherForecast id='weather-forecast' />}
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
