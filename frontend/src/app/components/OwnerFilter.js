import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ownerOptions = [
  { label: "First owner", value: 1, image: { url: "https://media.cars24.com/india/buy/facets_v4/icons/v2/user.svg" } },
  { label: "Second owner", value: 2, image: { url: "https://media.cars24.com/india/buy/facets_v4/icons/v2/users.svg" } },
  { label: "Third owner", value: 3, image: { url: "https://media.cars24.com/india/buy/facets_v4/icons/v2/group_users.svg" } },
  { label: "Fourth owner", value: 4, image: { url: "https://media.cars24.com/india/buy/facets_v4/icons/v2/group_users_for_4.svg" } }
];

const OwnerFilter = ({ onOwnerChange, carData = [] }) => {
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (ownerValue) => {
    const updatedOwners = selectedOwners.includes(ownerValue)
      ? selectedOwners.filter((o) => o !== ownerValue)
      : [...selectedOwners, ownerValue];

    setSelectedOwners(updatedOwners);
    onOwnerChange(updatedOwners);
  };

  // Count cars per owner category
  const ownerCounts = ownerOptions.reduce((acc, { value }) => {
    acc[value] = carData?.filter((car) => car.owners === value).length || 0;
    return acc;
  }, {});

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>Owners</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="mt-2">
          {ownerOptions.map(({ label, value, image }) => (
            <div key={value} className="flex items-center py-1">
              <input
                type="checkbox"
                id={`owner-${value}`}
                checked={selectedOwners.includes(value)}
                onChange={() => handleCheckboxChange(value)}
                className="mr-2"
              />
              <label htmlFor={`owner-${value}`} className="flex items-center">
                <img src={image.url} alt={label} className="w-5 h-5 mr-2" />
                <span>{label}</span>
                <span className="text-gray-500 ml-2">({ownerCounts[value]})</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerFilter;
