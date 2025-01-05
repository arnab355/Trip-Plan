import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function(value) {
        return value < this.endDate; // Ensure startDate is before endDate
      },
      message: 'Start date must be before end date.'
    }
  },
  endDate: { type: Date, required: true },
  notes: { type: String },
  itinerary: [{
    day: { type: Number, required: true },
    activities: [{
      time: String,
      description: String,
      location: String
    }]
  }],
  expenses: [{
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: String,
    date: { type: Date, default: Date.now }
  }],
  budget: { type: Number },
  packingList: [{
    item: String,
    isPacked: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now } // Track changes to packing items
  }],
  sharing: {
    isShared: { type: Boolean, default: false },
    shareLink: { type: String, default: generateShareLink() }, // Default link generation
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  groupNotes: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Function to generate a unique share link (could be more complex based on your needs)
function generateShareLink() {
  return 'https://example.com/share/' + Math.random().toString(36).substring(2, 15); // Example link generation logic
}

// Indexing userId and destination for better query performance
tripSchema.index({ userId: 1 });
tripSchema.index({ destination: 1 });

export default mongoose.model('Trip', tripSchema);
