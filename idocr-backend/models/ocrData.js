// ocr-backend/models/OcrData.js
const mongoose = require('mongoose');

const ocrDataSchema = new mongoose.Schema({
  identification_number: String,
  name: String,
  lastName: String,
  dateOfBirth: String,
  dateOfIssue: String,
  dateOfExpiry: String,
  // Add more fields as needed based on extracted OCR data
});

const OcrData = mongoose.model('OcrData', ocrDataSchema);

module.exports = OcrData;
