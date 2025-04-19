const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { type: String }, // Store the resume filename or path
  status: { type: String, default: 'New' },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
