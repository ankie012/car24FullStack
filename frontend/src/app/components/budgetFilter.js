import React, { useState } from "react";

const BudgetFilter = ({ onBudgetChange }) => {
  const [minPrice, setMinPrice] = useState(100000);
  const [maxPrice, setMaxPrice] = useState(2500000);

  const handleMinChange = (event) => {
    const newMin = Number(event.target.value);
    setMinPrice(newMin);
    if (newMin <= maxPrice) {
      onBudgetChange(newMin, maxPrice);
    }
  };

  const handleMaxChange = (event) => {
    const newMax = Number(event.target.value);
    setMaxPrice(newMax);
    if (newMax >= minPrice) {
      onBudgetChange(minPrice, newMax);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Budget</h2>
      <div className="flex justify-between text-blue-600 font-semibold">
        <span>₹ {minPrice.toLocaleString()}</span>
        <span>₹ {maxPrice.toLocaleString()}</span>
      </div>

      {/* Min Price Range */}
      <input
        type="range"
        min="100000"
        max="2500000"
        step="10000"
        value={minPrice}
        onChange={handleMinChange}
        className="w-full mt-2"
      />

      {/* Max Price Range */}
      {/* <input
        type="range"
        min="100000"
        max="2500000"
        step="10000"
        value={maxPrice}
        onChange={handleMaxChange}
        className="w-full mt-2"
      /> */}

      <div className="flex justify-between text-gray-400 text-sm">
        <span>Minimum</span>
        <span>Maximum</span>
      </div>
    </div>
  );
};

export default BudgetFilter;
