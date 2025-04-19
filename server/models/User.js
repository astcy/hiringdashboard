const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true, // Optional: create an index on email for faster lookups
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Optional: email validation regex
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
