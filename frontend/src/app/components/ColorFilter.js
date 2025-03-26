import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const colors = [
  { name: "Silver", icon: "https://media.cars24.com/india/buy/facets_v4/colour/grey.png" },
  { name: "White", icon: "https://media.cars24.com/india/buy/facets_v4/colour/white.png" },
  { name: "Red", icon: "https://media.cars24.com/india/buy/facets_v4/colour/red.png" },
  { name: "Blue", icon: "https://media.cars24.com/india/buy/facets_v4/colour/blue.png" },
  { name: "Brown", icon: "https://media.cars24.com/india/buy/facets_v4/colour/brown.png" },
  { name: "Black", icon: "https://media.cars24.com/india/buy/facets_v4/colour/black.png" },
  { name: "Orange", icon: "https://media.cars24.com/india/buy/facets_v4/colour/orange.png" },
  { name: "Purple", icon: "https://media.cars24.com/india/buy/facets_v4/colour/purple.png" },
  { name: "Green", icon: "https://media.cars24.com/india/buy/facets_v4/colour/green.png" },
  { name: "Yellow", icon: "https://media.cars24.com/india/buy/facets_v4/colour/yellow.png" },
];

const ColorFilter = ({ onColorChange, carData = [] }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorClick = (color) => {
    const updatedColor = selectedColor === color ? null : color;
    setSelectedColor(updatedColor);
    onColorChange(updatedColor);
  };

  // Count cars per color
  const colorCounts = colors.reduce((acc, { name }) => {
    acc[name] = carData?.filter((car) => car.color === name).length || 0;
    return acc;
  }, {});

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>Color</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {colors.map(({ name, icon }) => (
            <div
              key={name}
              className={`flex flex-col items-center justify-center border p-2 rounded-lg cursor-pointer ${
                selectedColor === name ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleColorClick(name)}
            >
              <img src={icon} alt={name} className="w-10 h-10" />
              <span className="text-xs font-medium mt-1">{name}</span>
              <span className="text-xs text-gray-500">({colorCounts[name]})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorFilter;
