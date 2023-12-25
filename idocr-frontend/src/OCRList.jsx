import React, { useState, useEffect } from 'react';
import './app.css'; // Import common CSS styles

const OCRList = () => {
  const [ocrData, setOcrData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/fetchAllFromOCRDatabase');
      if (response.ok) {
        const data = await response.json();
        setOcrData(data);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="common-styles"> {/* Apply common CSS class */}
      <h2>OCR Data List</h2>
      <ul>
        {ocrData.map((item, index) => (
          <li key={index}>{/* Render data as needed */}</li>
        ))}
      </ul>
    </div>
  );
};

export default OCRList;
