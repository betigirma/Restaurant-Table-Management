// src/App.js
import React, { useState, useRef } from 'react';
import Restaurant from './components/Restaurant';

function App() {
  const [partySize, setPartySize] = useState('');
  const restaurantRef = useRef();

  // Handle input change
  const handleChange = (e) => {
    setPartySize(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const size = parseInt(partySize);
    if (isNaN(size) || size <= 0) {
      alert('Please enter a valid party size.');
      return;
    }
    if (restaurantRef.current) {
      restaurantRef.current.allocateTable(size);
      setPartySize(''); // Reset the input field
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Restaurant Table Management</h1>
      
      {/* New Party Form */}
      <form onSubmit={handleSubmit} className="mb-8 flex">
        <input 
          type="number"
          value={partySize}
          onChange={handleChange}
          placeholder="Enter party size"
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          required
        />
        <button 
          type="submit" 
          className="ml-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Allocate Table
        </button>
      </form>
      
      {/* Restaurant Component */}
      <Restaurant ref={restaurantRef} />
    </div>
  );
}

export default App;
