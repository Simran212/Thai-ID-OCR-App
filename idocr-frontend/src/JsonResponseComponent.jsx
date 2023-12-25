import React, { useState } from 'react';

const JsonResponseComponent = () => {
  const [response, setResponse] = useState(null);

  const fetchData = async () => {
    try {
      const result = await fetch('http://localhost:5000/upload'); // Replace with your backend URL
      const data = await result.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call fetchData when the component mounts or whenever needed
  // For example, you can call it onClick of a button
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default JsonResponseComponent;