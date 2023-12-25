import React, { useState } from "react";
import Header from "./Header";
import OCRList from "./OCRList";

const App = () => {
  const [file, setFile] = useState(null);
  const [responseJson, setResponseJson] = useState(null);
  const [responseJsonForOCR, setResponseJsonForOCR] = useState(null);
  const [showUploadOption, setShowUploadOption] = useState(null);
  const [listOCROption, setListOCROption] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseJson(data);
        // Handle success - set the response JSON in state
      } else {
        console.error("Error:", response.statusText);
        // Handle error - display an error message or perform actions for failure
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchOCRList = async () => {
    try {

      const response = await fetch("http://localhost:5000/fetchAllFromOCRDatabase", {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        setResponseJsonForOCR(data);
        // Handle success - set the response JSON in state
      } else {
        console.error("Error:", response.statusText);
        // Handle error - display an error message or perform actions for failure
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleUploadOption = () => {
    setShowUploadOption(!showUploadOption);
  };

  const toggleListOCROption = () => {
    setListOCROption(!listOCROption);
  };

  return (
    <div>
      <div>
        <Header /> {/* Include the Header component */}
        {/* Other content or page components */}
      </div>

      <div className="feature-section">
        <h2>Features</h2>
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleUploadOption}>
            Upload Image
            <span
              className={showUploadOption ? "arrow up" : "arrow down"}
            ></span>
          </button>
          <div
            className={
              showUploadOption ? "dropdown-content show" : "dropdown-content"
            }
          >
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            <div className="response-container">
              <h2>OCR JSON Response</h2>
              {responseJson && (
                <pre>{JSON.stringify(responseJson, null, 2)}</pre>
              )}
              {/* Display the response data as a string inside a <pre> tag */}
            </div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={() => { toggleListOCROption(); fetchOCRList(); }}>
            List All OCRs
            <span
              className={listOCROption ? "arrow up" : "arrow down"}
            ></span>
          </button>
          
          <div
            className={
              listOCROption ? "dropdown-content show" : "dropdown-content"
            }
          >
            <div className="response-container">
              {responseJsonForOCR && (
                <pre>{JSON.stringify(responseJsonForOCR, null, 2)}</pre>
              )}
              {/* Display the response data as a string inside a <pre> tag */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
