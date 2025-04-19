const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

// ✅ Register Route
router.post('/register', async (req, res) => {
  console.log("📥 Incoming request to /register:", req.body);

  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields.' });
    }

    console.log("✅ Fields validated");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format:", email);
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    console.log("✅ User does not exist, proceeding to create a new user");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed");

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();
    console.log("✅ New user saved to DB:", newUser.email);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '2h' }
    );

    console.log("✅ Token generated:", token);

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("❌ Error in /register route:", error);
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  console.log("📥 Incoming request to /login:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("❌ Email or password missing");
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: 'User not found. Please register.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match for user:", email);
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    console.log("✅ Login successful for:", email);

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Error in /login route:", err);
    res.status(500).json({ message: 'Server error during login.', error: err.message });
  }
});

module.exports = router;
