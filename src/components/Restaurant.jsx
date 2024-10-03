import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Table from './Table';

// Forward ref to allow parent component to call allocateTable
const Restaurant = forwardRef((props, ref) => {
  // Initialize table data
  const initialTables = [
    { id: 1, capacity: 10, occupied: false, occupants: 0 },
    { id: 2, capacity: 8, occupied: false, occupants: 0 },
    { id: 3, capacity: 10, occupied: false, occupants: 0 },
    { id: 4, capacity: 6, occupied: false, occupants: 0 },
    { id: 5, capacity: 2, occupied: false, occupants: 0 },
    { id: 6, capacity: 6, occupied: false, occupants: 0 },
    { id: 7, capacity: 4, occupied: false, occupants: 0 },
    { id: 8, capacity: 12, occupied: false, occupants: 0 },
  ];

  const [tables, setTables] = useState(initialTables);

  // Expose allocateTable method to parent via ref
  useImperativeHandle(ref, () => ({
    allocateTable(partySize) {
      // Find available tables that can accommodate the party
      const availableTables = tables.filter(table => !table.occupied && table.capacity >= partySize);
      if (availableTables.length === 0) {
        alert('No available table for this party size.');
        return;
      }
      // Find the table with the smallest sufficient capacity
      const smallestTable = availableTables.reduce((prev, current) => (prev.capacity < current.capacity ? prev : current));
      
      // Allocate the table
      const updatedTables = tables.map(table => {
        if (table.id === smallestTable.id) {
          return { ...table, occupied: true, occupants: partySize };
        }
        return table;
      });
      setTables(updatedTables);
    }
  }));

  // Handle eviction of a table
  const handleEvict = (tableId) => {
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        return { ...table, occupied: false, occupants: 0 };
      }
      return table;
    });
    setTables(updatedTables);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-4xl">
      {tables.map(table => (
        <Table 
          key={table.id} 
          table={table} 
          onEvict={() => handleEvict(table.id)} 
        />
      ))}
    </div>
  );
});

export default Restaurant;
