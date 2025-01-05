// components/itinerary/ItineraryBuilder.js
import React, { useState } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';

const ItineraryBuilder = ({ tripId, initialItinerary, onUpdate }) => {
  const [activities, setActivities] = useState(initialItinerary || []);
  const [newActivity, setNewActivity] = useState({
    day: 1,
    time: '',
    description: '',
    location: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update existing activity
      const updatedActivities = [...activities];
      updatedActivities[editingIndex] = newActivity;
      setActivities(updatedActivities);
      setEditingIndex(null);
    } else {
      // Add new activity
      setActivities([...activities, newActivity]);
    }
    onUpdate([...activities, newActivity]);
    setNewActivity({ day: 1, time: '', description: '', location: '' });
  };

  const handleEdit = (index) => {
    setNewActivity(activities[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    onUpdate(updatedActivities);
  };

  const sortedActivities = [...activities].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="itinerary-builder">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{editingIndex !== null ? 'Edit Activity' : 'Add New Activity'}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-2">
                <Form.Group className="mb-3">
                  <Form.Label>Day</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    required
                    value={newActivity.day}
                    onChange={(e) => setNewActivity({...newActivity, day: parseInt(e.target.value)})}
                  />
                </Form.Group>
              </div>
              <div className="col-md-2">
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                    placeholder="Enter activity description"
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                    placeholder="Enter location"
                  />
                </Form.Group>
              </div>
            </div>

            <Button type="submit" variant="primary">
              {editingIndex !== null ? 'Update Activity' : 'Add Activity'}
            </Button>
            {editingIndex !== null && (
              <Button 
                variant="secondary" 
                className="ms-2"
                onClick={() => {
                  setEditingIndex(null);
                  setNewActivity({ day: 1, time: '', description: '', location: '' });
                }}
              >
                Cancel Edit
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>

      <h4>Itinerary Schedule</h4>
      {sortedActivities.length === 0 ? (
        <p className="text-muted">No activities planned yet</p>
      ) : (
        <ListGroup>
          {sortedActivities.map((activity, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center" style={{ width: '80%' }}>
                <div className="me-4" style={{ width: '10%' }}>
                  <strong>Day {activity.day}</strong>
                </div>
                <div className="me-4" style={{ width: '15%' }}>
                  {activity.time}
                </div>
                <div className="me-4" style={{ width: '35%' }}>
                  {activity.description}
                </div>
                <div style={{ width: '40%' }}>
                  {activity.location}
                </div>
              </div>
              <div>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ItineraryBuilder;
