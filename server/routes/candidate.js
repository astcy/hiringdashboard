const express = require('express');
const Candidate = require('../models/candidate');
const router = express.Router();

// Endpoint to fetch candidates by email
router.get('/:email', async (req, res) => {
  try {
    const candidates = await Candidate.find({ email: req.params.email });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to add a new candidate
router.post('/add', async (req, res) => {
  const { name, email, phone, position, experience, resume, agree } = req.body;
  if (!agree) return res.status(400).json({ error: 'You must agree to the terms' });

  try {
    const newCandidate = new Candidate({
      name,
      email,
      phone,
      position,
      experience,
      resume,
    });

    await newCandidate.save();
    res.status(201).json({ message: 'Candidate added successfully', newCandidate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
