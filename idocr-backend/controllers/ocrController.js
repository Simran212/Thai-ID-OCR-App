// ocr-backend/controllers/ocrController.js
// Sample code using Google Vision API (requires authentication)
const { google } = require("googleapis");
const OcrData = require("../models/ocrData");
const { Readable } = require("stream");

// Configure Google Vision API
const vision = google.vision("v1");
const auth = new google.auth.GoogleAuth({
  keyFile: "./config/serviceKeyGCP.json",
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

uploadImageAndPerformOCR = async (req, res) => {
  try {
    const fileStream = Readable.from([req.data]);
    const buffer = [];

    fileStream.on("data", (chunk) => {
      buffer.push(chunk);
    });

    const savedOCRData = await new Promise((resolve, reject) => {
      fileStream.on("end", async () => {
        try {
          const data = Buffer.concat(buffer);
          const result = await vision.images.annotate({
            auth: auth,
            requestBody: {
              requests: [
                {
                  image: {
                    content: data.toString("base64"),
                  },
                  features: [
                    {
                      type: "TEXT_DETECTION",
                    },
                  ],
                },
              ],
            },
          });

          const ocrText = result.data.responses[0].fullTextAnnotation.text;

          const lines = ocrText.split("\n");

          // Helper function to find a value based on a keyword
          const findValueForKeyword = (keyword) => {
            const lineWithKeyword = lines.find((line) =>
              line.includes(keyword)
            );
            if (lineWithKeyword) {
              const value = lineWithKeyword.split(keyword)[1].trim();
              return value;
            }
            return "";
          };

          // Extracting information based on specific keywords
          const identificationNumber = lines[1];
          const name = findValueForKeyword("Name");
          const lastName = findValueForKeyword("Last name");
          const dateOfBirth = findValueForKeyword("Date of Birth");
          const dateOfIssue = lines[15];
          const dateOfExpiry = lines[24];

          // Mapping to ocrDataObject
          const ocrDataObject = {
            identificationNumber: identificationNumber,
            name: name,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            dateOfIssue: dateOfIssue,
            dateOfExpiry: dateOfExpiry,
            // Add other properties as needed
          };

          // Process OCR text and extract required information
          // Store the extracted information in the database
          const savedOCRData = await OcrData.create(ocrDataObject);
          resolve(savedOCRData);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    });

    return savedOCRData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchAllObjectsFromOCRCollection = async () => {
  try {
    const allObjects = await OcrData.find({}); // Retrieve all objects from the collection
    return allObjects;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { fetchAllObjectsFromOCRCollection, uploadImageAndPerformOCR };
