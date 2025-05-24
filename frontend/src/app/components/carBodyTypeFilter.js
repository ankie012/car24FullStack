import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const bodyTypes = [
  { type: "Hatchback", img: "https://media.cars24.com/india/buy/facets_v4/body_type/22072024/Hatchback.png" },
  { type: "Sedan", img: "https://media.cars24.com/india/buy/facets_v4/body_type/22072024/Sedan.png" },
  { type: "SUV", img: "https://media.cars24.com/india/buy/facets_v4/body_type/22072024/SUV.png" },
];

const BodyTypeFilter = ({ onBodyTypeChange, carData = [] }) => {
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBodyTypeClick = (type) => {
    const updatedBodyType = selectedBodyType === type ? null : type;
    setSelectedBodyType(updatedBodyType);
    onBodyTypeChange(updatedBodyType);
  };

  // Count cars per body type
  const bodyTypeCounts = bodyTypes.reduce((acc, { type }) => {
    acc[type] = carData?.filter((car) => car.bodyType === type).length || 0;
    return acc;
  }, {});

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>Body Type</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {bodyTypes.map(({ type, img }) => (
            <div
              key={type}
              className={`flex flex-col items-center border p-2 rounded-lg cursor-pointer ${
                selectedBodyType === type ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleBodyTypeClick(type)}
            >
              <img src={img} alt={type} className="w-16 h-10" />
              <span className="text-sm font-medium">{type}</span>
              <span className="text-xs text-gray-500">({bodyTypeCounts[type]})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BodyTypeFilter;
