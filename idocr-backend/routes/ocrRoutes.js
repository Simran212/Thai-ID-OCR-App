// ocr-backend/routes/ocrRoutes.js
const express = require("express");
const router = express.Router();
const ocrController = require("../controllers/ocrController");

router.get("/", (req, res, next) => {
  console.log("Request received at root endpoint");
  res.status(200).send("Hello, World!");
});

// Route for uploading image and performing OCR
router.post("/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.files.file; // Access the uploaded file details from req.file

  // Call the OCR controller method passing the file for processing
  const result = await ocrController.uploadImageAndPerformOCR(file);

  if (!result) {
    return res.status(500).json({ error: "OCR processing failed" });
  }

  res.json({ result }); // Return the result after processing
});

router.get("/fetchAllFromOCRDatabase", async (req, res) => {
  const allObjects = await ocrController.fetchAllObjectsFromOCRCollection();

  if (!allObjects) {
    res.status(500).send("Error while retrieving data from DB");
  }

  res.status(200).json(allObjects);
});

module.exports = router;
