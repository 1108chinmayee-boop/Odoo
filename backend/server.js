const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();

const PORT = process.env.PORT || 5000;
const employeeRoutes = require("./routes/employeeRoutes");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Dayflow API is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Dayflow server running on http://localhost:${PORT}`);
});