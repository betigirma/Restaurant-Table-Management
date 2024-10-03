import React, { useEffect, useState } from 'react';

function Table({ table, onEvict }) {
  const [timer, setTimer] = useState(null);

  // Initialize timer when table becomes occupied
  useEffect(() => {
    if (table.occupied) {
        setTimer(1800); // 30 minutes = 1800 seconds
    } else {
      setTimer(null);
    }
  }, [table.occupied]);

  // Countdown effect
  useEffect(() => {
    let interval = null;
    if (timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      onEvict();
      alert(`Table ${table.id} is now available!`);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, onEvict, table.id]);

  // Format timer as mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Handle manual eviction
  const handleEvictClick = () => {
    onEvict();
    alert(`Table ${table.id} has been evicted.`);
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${table.occupied ? 'bg-red-500' : 'bg-green-500'} text-white flex flex-col items-center`}>
      <p className="text-2xl font-semibold mb-2">Table {table.id}</p>
      {table.occupied ? (
        <>
          <p className="mb-1">Occupants: {table.occupants}</p>
          <p className="mb-4">Time Remaining: {formatTime(timer)}</p>
          <button 
            onClick={handleEvictClick} 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
          >
            Evict
          </button>
        </>
      ) : (
        <p className="text-lg">Capacity: {table.capacity}</p>
      )}
    </div>
  );
}

export default Table;
