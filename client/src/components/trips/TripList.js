import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TripCard from './TripCard';

const TripList = ({ trips, onDeleteTrip }) => {
  return (
    <Row>
      {trips.map(trip => (
        <Col key={trip._id} md={4} className="mb-4">
          <TripCard trip={trip} onDelete={onDeleteTrip} />
        </Col>
      ))}
    </Row>
  );
};

export default TripList;