import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const RTOFilter = ({ onRTOChange, carData = [] }) => {
  const [selectedRTOs, setSelectedRTOs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique RTOs and their count
  const rtoCounts = carData.reduce((acc, car) => {
    acc[car.RTO] = (acc[car.RTO] || 0) + 1;
    return acc;
  }, {});

  const rtoOptions = Object.entries(rtoCounts).map(([rto, count]) => ({ rto, count }));

  const handleCheckboxChange = (rto) => {
    const updatedRTOs = selectedRTOs.includes(rto)
      ? selectedRTOs.filter((selected) => selected !== rto)
      : [...selectedRTOs, rto];
    
    setSelectedRTOs(updatedRTOs);
    onRTOChange(updatedRTOs);
  };

  const filteredRTOs = rtoOptions.filter(({ rto }) => 
    rto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>RTO</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Search for a RTO"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="mt-2 max-h-48 overflow-y-auto">
            {filteredRTOs.map(({ rto, count }) => (
              <div key={rto} className="flex items-center py-1">
                <input
                  type="checkbox"
                  id={`rto-${rto}`}
                  checked={selectedRTOs.includes(rto)}
                  onChange={() => handleCheckboxChange(rto)}
                  className="mr-2"
                />
                <label htmlFor={`rto-${rto}`} className="flex items-center">
                  <span>{rto}</span>
                  <span className="text-gray-500 ml-2">({count})</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RTOFilter;