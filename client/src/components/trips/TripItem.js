import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const TripItem = ({ trip }) => {
  const isUpcoming = new Date(trip.startDate) > new Date();

  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title>{trip.name}</Card.Title>
          <Badge bg={isUpcoming ? 'primary' : 'secondary'}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </Badge>
        </div>
        <Card.Text>
          <strong>Destination:</strong> {trip.destination}
          <br />
          <strong>Dates:</strong>{' '}
          {new Date(trip.startDate).toLocaleDateString()} - 
          {new Date(trip.endDate).toLocaleDateString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TripItem;
