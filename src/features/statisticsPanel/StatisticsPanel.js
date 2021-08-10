import React from 'react';
import { Card, Tabs, Tab, ListGroup } from 'react-bootstrap';

import './StatisticsPanel.css';

export default function StatisticsPanel({ trackers, city, activeDay }) {
    const { dayTempTracker, nightTempTracker, humidityTracker } = trackers;

    return (
        <Tabs defaultActiveKey="dayTime" id="uncontrolled-tab-example" className="lg-2">
            <Tab eventKey="dayTime" title="DAY🌞" disabled={dayTempTracker.values.length === 0}>
                <Card className="dayPanel">
                    <Card.Body>
                        <Card.Title>{activeDay}</Card.Title>
                        <Card.Subtitle>{city}</Card.Subtitle>
                        <ListGroup.Item>Min: {dayTempTracker.getMin()}°C</ListGroup.Item>
                        <ListGroup.Item>Max: {dayTempTracker.getMax()}°C</ListGroup.Item>
                        <ListGroup.Item>Mean: {dayTempTracker.getMean()}°C</ListGroup.Item>
                        <ListGroup.Item>Mode: {dayTempTracker.getMode()}°C</ListGroup.Item>
                    </Card.Body>
                </Card>
            </Tab>
            <Tab eventKey="nightTime" title="NIGHT🌛" disabled={nightTempTracker.values.length === 0}>
                <Card className="nightPanel">
                    <Card.Body>
                        <Card.Title>{activeDay}</Card.Title>
                        <Card.Subtitle>{city}</Card.Subtitle>
                        <ListGroup.Item>Min: {nightTempTracker.getMin()}°C</ListGroup.Item>
                        <ListGroup.Item>Max: {nightTempTracker.getMax()}°C</ListGroup.Item>
                        <ListGroup.Item>Mean: {nightTempTracker.getMean()}°C</ListGroup.Item>
                        <ListGroup.Item>Mode: {nightTempTracker.getMode()}°C</ListGroup.Item>
                    </Card.Body>
                </Card>
            </Tab>
            <Tab eventKey="humidity" title="HUMIDITY🌊" disabled={humidityTracker.values.length === 0}>
                <Card className="humidityPanel">
                    <Card.Body>
                        <Card.Title>{activeDay}</Card.Title>
                        <Card.Subtitle>{city}</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Min: {humidityTracker.getMin()}%</ListGroup.Item>
                            <ListGroup.Item>Max: {humidityTracker.getMax()}%</ListGroup.Item>
                            <ListGroup.Item>Mean: {humidityTracker.getMean()}%</ListGroup.Item>
                            <ListGroup.Item>Mode: {humidityTracker.getMode()}%</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Tab>
        </Tabs>
    );
}
