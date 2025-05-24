import React, { useState } from "react";

const KmDrivenFilter = ({ onKmDrivenChange }) => {
  const [minKm, setMinKm] = useState(0);
  const [maxKm, setMaxKm] = useState(125000);

  const handleKmChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    if (type === "min") {
      setMinKm(value);
      onKmDrivenChange(value, maxKm);
    } else {
      setMaxKm(value);
      onKmDrivenChange(minKm, value);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-2">Kms Driven</h3>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{minKm} Km</span>
        <input
          type="range"
          min="0"
          max="125000"
          value={minKm}
          onChange={(e) => handleKmChange(e, "min")}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="125000"
          value={maxKm}
          onChange={(e) => handleKmChange(e, "max")}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{maxKm} Km</span>
      </div>
    </div>
  );
};

export default KmDrivenFilter;
