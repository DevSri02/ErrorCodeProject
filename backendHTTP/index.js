const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database"); // Import the database connection
const AuthRoutes = require("./routes/authRoutes");
const ListRoutes = require("./routes/listRoutes");

const app = express();

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB(); // Call the database connection

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/lists", ListRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
