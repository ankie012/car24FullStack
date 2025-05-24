"use client"
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const transmissions = [
  { type: "Manual", icon: "https://media.cars24.com/india/buy/facets_v5/transmission/manual.svg" },
  { type: "Automatic", icon: "https://media.cars24.com/india/buy/facets_v5/transmission/automatic.svg" },
];

const TransmissionFilter = ({ onTransmissionChange, carData = [] }) => {
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleTransmissionClick = (type) => {
    const updatedTransmission = selectedTransmission === type ? null : type;
    setSelectedTransmission(updatedTransmission);
    onTransmissionChange(updatedTransmission);
  };

  // Count cars per transmission type
  const transmissionCounts = transmissions.reduce((acc, { type }) => {
    acc[type] = carData?.filter((car) => car.transmission === type).length || 0;
    return acc;
  }, {});

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>Transmission</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="mt-2">
          {transmissions.map(({ type, icon }) => (
            <div
              key={type}
              className={`flex items-center justify-between border p-2 rounded-lg cursor-pointer ${
                selectedTransmission === type ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleTransmissionClick(type)}
            >
              <div className="flex items-center">
                <img src={icon} alt={type} className="w-6 h-6 mr-2" />
                <span className="text-sm font-medium">{type}</span>
              </div>
              <span className="text-xs text-gray-500">({transmissionCounts[type]})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransmissionFilter;
