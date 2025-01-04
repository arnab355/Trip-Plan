// components/trips/TripCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TripCard = ({ trip, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Call the onDelete prop directly
      await onDelete(trip._id);
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <Card className="h-100 shadow-sm hover-card">
      <Card.Body>
        <Card.Title className="text-primary">{trip.name}</Card.Title>
        <Card.Text>
          <strong>Destination:</strong> {trip.destination}<br />
          <strong>Date:</strong> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button 
            variant="outline-primary"
            onClick={() => navigate(`/trip/${trip._id}`)}
          >
            View Details
          </Button>
          <Button 
            variant="outline-danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TripCard;