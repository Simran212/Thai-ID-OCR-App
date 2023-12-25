// ocr-backend/index.js
const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const cors = require('cors');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());

// Enable file uploads middleware
app.use(
  fileUpload({
    //useTempFiles : true
  })
);

// Middleware for JSON parsing
app.use(express.json());

// Import and use the router
const router = require("./routes/ocrRoutes");
app.use("/", router);

// Set up server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
