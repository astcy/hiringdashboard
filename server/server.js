const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const candidateRoutes = require('./routes/candidate');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/candidates', candidateRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,  // Timeout for server selection
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process on connection failure
  });
  app.use(express.json()); // Keep this as it is already

// ✅ Routes
const authRoutes = require('./routes/auth'); // Ensure this path is correct
app.use('/api/auth', authRoutes); // Register route: /api/auth/register

// ✅ Sample route to test
app.get("/", (req, res) => {
  res.send("HRMS API is running!");
});



// ✅ 404 Error Handling
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
