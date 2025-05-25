import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
// import axios from "axios"; 

const fuelOptions = [
  { label: "Petrol", value: "Petrol", image: { url: "https://media.cars24.com/india/buy/facets_v4/fuel_type/Petrol.png" } },
  { label: "Diesel", value: "Diesel", image: { url: "https://media.cars24.com/india/buy/facets_v4/fuel_type/Diesel.png" } },
  { label: "CNG", value: "CNG", image: { url: "https://media.cars24.com/india/buy/facets_v4/fuel_type/CNG.png" } },
  { label: "Hybrid", value: "Hybrid", image: { url: "https://media.cars24.com/india/buy/facets_v4/fuel_type/Hybrid.png" } },
  { label: "Electric", value: "Electric", image: { url: "https://media.cars24.com/india/buy/facets_v4/fuel_type/Electric.png" } }
];

const FuelFilter = ({ onFuelChange, carData = [] }) => {
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState([]);
  
 
  const handleCheckboxChange = (fuel) => {
    const updatedFuels = selectedFuels.includes(fuel)
      ? selectedFuels.filter((f) => f !== fuel)
      : [...selectedFuels, fuel];

    setSelectedFuels(updatedFuels);
    onFuelChange(updatedFuels);
  };

  // Count cars per fuel type, safely handling undefined carData
  const fuelCounts = fuelOptions.reduce((acc, { value }) => {
    acc[value] = carData?.filter((car) => car.fuel_type && car.fuel_type.includes(value)).length || 0; 
    return acc;
  }, {});

  return (
    <div className="p-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-base font-bold mb-2"
      >
        <span>Fuel Type</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-1">
          {fuelOptions.map(({ label, value, image }) => (
            <div key={value} className="flex items-center justify-between py-1.5">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id={value}
                  checked={selectedFuels.includes(value)}
                  onChange={() => handleCheckboxChange(value)}
                  className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <img src={image.url} alt={label} className="w-5 h-5 mr-2" />
                <span className="text-sm">{label}</span>
              </label>
              <span className="text-xs text-gray-500">({fuelCounts[value]})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FuelFilter;
