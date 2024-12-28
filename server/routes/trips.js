import express from 'express';
import Trip from '../models/Trip.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all trips for a user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.json(trips);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get single trip by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    // Check if user owns trip or trip is shared with user
    if (trip.userId.toString() !== req.user.id && 
        !trip.sharing.sharedWith.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    res.json(trip);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a new trip
router.post('/', auth, async (req, res) => {
  try {
    const newTrip = new Trip({
      userId: req.user.id,
      ...req.body,
      sharing: { isShared: false, shareLink: '', sharedWith: [] }
    });
    const trip = await newTrip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update trip
router.put('/:id', auth, async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ msg: 'Trip not found' });
    
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(trip);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete trip
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Trip.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Trip deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add expense to trip
router.post('/:id/expenses', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    trip.expenses.push(req.body);
    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update itinerary
router.put('/:id/itinerary', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    trip.itinerary = req.body;
    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add single activity to itinerary
router.post('/:id/itinerary', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    if (!trip.itinerary) trip.itinerary = [];
    trip.itinerary.push(req.body);
    
    await trip.save();
    res.json(trip.itinerary);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update packing list
router.put('/:id/packing-list', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    trip.packingList = req.body;
    await trip.save();
    res.json(trip.packingList);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
