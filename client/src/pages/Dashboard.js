import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import TripForm from '../components/trips/TripForm';
import TripCard from '../components/trips/TripCard';
import allBg from '../assets/all-bg.jpg';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/trips', {
        headers: {
          'x-auth-token': token,
        },
      });
      setTrips(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch trips');
      setLoading(false);
      console.error('Error fetching trips:', err);
    }
  };

  const handleCreateTrip = async (tripData) => {
    try {
      const token = localStorage.getItem('token');
      
      // Format dates properly
      const formattedTripData = {
        ...tripData,
        startDate: new Date(tripData.startDate).toISOString(),
        endDate: new Date(tripData.endDate).toISOString()
      };

      const response = await axios.post('http://localhost:5000/api/trips', formattedTripData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      setTrips([...trips, response.data]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Failed to create trip');
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));
    } catch (err) {
      setError('Failed to delete trip');
      console.error('Error deleting trip:', err);
    }
  };

  const upcomingTrips = trips.filter((trip) => new Date(trip.startDate) >= new Date());
  const pastTrips = trips.filter((trip) => new Date(trip.startDate) < new Date());

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <Container
      className="py-4"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '2rem',
        color: '#fff',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${allBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          zIndex: -1,
        }}
      ></div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Trips</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add New Trip
        </Button>
      </div>

      <section className="mb-5">
        <h2>Upcoming Trips</h2>
        <Row>
          {upcomingTrips.length === 0 ? (
            <Col>
              <p className="text-muted">No upcoming trips planned.</p>
            </Col>
          ) : (
            upcomingTrips.map((trip) => (
              <Col key={trip._id} md={4} className="mb-3">
                <TripCard trip={trip} onDelete={handleDeleteTrip} />
              </Col>
            ))
          )}
        </Row>
      </section>

      <section>
        <h2>Past Trips</h2>
        <Row>
          {pastTrips.length === 0 ? (
            <Col>
              <p className="text-muted">No past trips.</p>
            </Col>
          ) : (
            pastTrips.map((trip) => (
              <Col key={trip._id} md={4} className="mb-3">
                <TripCard trip={trip} onDelete={handleDeleteTrip} />
              </Col>
            ))
          )}
        </Row>
      </section>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TripForm onSubmit={handleCreateTrip} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;