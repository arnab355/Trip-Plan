import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UpdateTripForm = ({ show, trip, onClose, onUpdate }) => {
  const [tripData, setTripData] = useState({
    name: trip?.name || '',
    destination: trip?.destination || '',
    startDate: trip?.startDate ? new Date(trip.startDate).toISOString().split('T')[0] : '',
    endDate: trip?.endDate ? new Date(trip.endDate).toISOString().split('T')[0] : '',
    notes: trip?.notes || '',
    budget: trip?.budget || 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/trips/${trip._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(tripData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success('Trip updated successfully!');
      onUpdate(data);
      onClose();
      
    } catch (error) {
      console.error('Error updating trip:', error);
      toast.error(error.message || 'Failed to update trip. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={tripData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              name="destination"
              value={tripData.destination}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={tripData.startDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={tripData.endDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={tripData.budget}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={tripData.notes}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Trip
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTripForm;
