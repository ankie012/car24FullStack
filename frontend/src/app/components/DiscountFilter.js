import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const DiscountFilter = ({ onDiscountChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const discountOptions = [
    { label: "5% off or more", value: 5 },
    { label: "10% off or more", value: 10 },
    { label: "15% off or more", value: 15 },
    { label: "20% off or more", value: 20 },
    { label: "EMI discount up to ₹2500/month", value: "emi" },
  ];

  const handleRadioChange = (value) => {
    const numericValue = value === "emi" ? value : Number(value); // Convert to number if it's a percentage
    setSelectedDiscount(numericValue);
    onDiscountChange(numericValue);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>Discount</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="mt-2">
          {discountOptions.map(({ label, value }) => (
            <div key={value} className="flex items-center py-1">
              <input
                type="radio"
                id={`discount-${value}`}
                name="discount"
                value={value}
                checked={selectedDiscount === value}
                onChange={() => handleRadioChange(value)}
                className="mr-2"
              />
              <label htmlFor={`discount-${value}`} className="flex items-center">
                {label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscountFilter;
