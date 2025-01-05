// components/trips/TripForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TripForm = ({ onSubmit }) => {
  const [tripData, setTripData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    notes: '',
    budget: '' // Changed from expenses to budget
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...tripData,
      budget: Number(tripData.budget) || 0 // Ensure budget is a number
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Trip Name</Form.Label>
        <Form.Control
          type="text"
          value={tripData.name}
          onChange={(e) => setTripData({...tripData, name: e.target.value})}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Destination</Form.Label>
        <Form.Control
          type="text"
          value={tripData.destination}
          onChange={(e) => setTripData({...tripData, destination: e.target.value})}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={tripData.startDate}
          onChange={(e) => setTripData({...tripData, startDate: e.target.value})}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={tripData.endDate}
          onChange={(e) => setTripData({...tripData, endDate: e.target.value})}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Budget ($)</Form.Label>
        <Form.Control
          type="number"
          value={tripData.budget}
          onChange={(e) => setTripData({...tripData, budget: e.target.value})}
          placeholder="Enter trip budget"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={tripData.notes}
          onChange={(e) => setTripData({...tripData, notes: e.target.value})}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Trip
      </Button>
    </Form>
  );
};

export default TripForm;
