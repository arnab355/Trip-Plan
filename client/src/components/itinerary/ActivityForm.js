// components/itinerary/ActivityForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ActivityForm = ({ onSubmit, day = 1 }) => {
  const [activity, setActivity] = useState({
    day: day,
    time: '',
    description: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(activity);
    setActivity({
      day: day,
      time: '',
      description: '',
      location: ''
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          value={activity.time}
          onChange={(e) => setActivity({...activity, time: e.target.value})}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={activity.description}
          onChange={(e) => setActivity({...activity, description: e.target.value})}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={activity.location}
          onChange={(e) => setActivity({...activity, location: e.target.value})}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Activity
      </Button>
    </Form>
  );
};

export default ActivityForm;
