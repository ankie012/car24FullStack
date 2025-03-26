import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  const handleCheckboxChange = (fuel) => {
    const updatedFuels = selectedFuels.includes(fuel)
      ? selectedFuels.filter((f) => f !== fuel)
      : [...selectedFuels, fuel];

    setSelectedFuels(updatedFuels);
    onFuelChange(updatedFuels);
  };

  // Count cars per fuel type, safely handling undefined carData
  const fuelCounts = fuelOptions.reduce((acc, { value }) => {
    acc[value] = carData?.filter((car) => car.fuel === value).length || 0;
    return acc;
  }, {});

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>Fuel</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="mt-2">
          {fuelOptions.map(({ label, value, image }) => (
            <div key={value} className="flex items-center justify-between p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id={value}
                  checked={selectedFuels.includes(value)}
                  onChange={() => handleCheckboxChange(value)}
                  className="mr-2"
                />
                <img src={image.url} alt={label} className="w-5 h-5 mr-2" />
                {label}
              </label>
              <span className="text-gray-500">({fuelCounts[value]})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FuelFilter;